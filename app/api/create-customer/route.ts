import { NextRequest, NextResponse } from "next/server";

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_APP_CLIENT_SECRET;
const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || "2025-04";
const ALLOWED_ORIGIN = "https://maisonshema.myshopify.com";

type CreateCustomerBody = {
  email?: string;
  firstName?: string;
  tags?: string;
};

function getShopifyHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

function withCorsHeaders(headers?: HeadersInit) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...headers,
  };
}

async function getAdminAccessToken() {
  const tokenUrl = `https://${SHOP_DOMAIN}/admin/oauth/access_token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: CLIENT_ID as string,
    client_secret: CLIENT_SECRET as string,
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  const data = (await res.json()) as {
    access_token?: string;
    scope?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !data.access_token) {
    throw new Error(
      `Shopify token grant failed: ${res.status} ${JSON.stringify(data)}`,
    );
  }

  return data.access_token;
}

async function getAuthedHeaders() {
  const accessToken = await getAdminAccessToken();
  return {
    ...getShopifyHeaders(),
    "X-Shopify-Access-Token": accessToken,
  };
}

async function searchCustomerByEmail(email: string) {
  const url =
    `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/customers/search.json?query=` +
    encodeURIComponent(`email:${email}`);

  const res = await fetch(url, {
    method: "GET",
    headers: await getAuthedHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Shopify search failed: ${res.status} ${errorText}`);
  }

  return (await res.json()) as {
    customers?: Array<{ id: number; tags?: string }>;
  };
}

async function updateCustomerTags(customerId: number, tags: string) {
  const res = await fetch(
    `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/customers/${customerId}.json`,
    {
      method: "PUT",
      headers: await getAuthedHeaders(),
      body: JSON.stringify({
        customer: {
          id: customerId,
          tags,
        },
      }),
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Shopify update failed: ${res.status} ${errorText}`);
  }

  return res.json();
}

async function createCustomer(email: string, firstName: string, tags: string) {
  const res = await fetch(
    `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/customers.json`,
    {
      method: "POST",
      headers: await getAuthedHeaders(),
      body: JSON.stringify({
        customer: {
          email,
          first_name: firstName,
          tags,
          send_email_invite: true,
        },
      }),
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Shopify create failed: ${res.status} ${errorText}`);
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  if (!SHOP_DOMAIN || !CLIENT_ID || !CLIENT_SECRET) {
    return NextResponse.json(
      { error: "Configuration Shopify serveur manquante" },
      { status: 500, headers: withCorsHeaders() },
    );
  }

  try {
    const body = (await req.json()) as CreateCustomerBody;
    const email = body.email?.trim().toLowerCase();
    const firstName = body.firstName?.trim();
    const tags = body.tags?.trim() || "";

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "Email et prénom requis" },
        { status: 400, headers: withCorsHeaders() },
      );
    }

    const searchData = await searchCustomerByEmail(email);
    const existingCustomer = searchData.customers?.[0];

    if (existingCustomer) {
      const currentTags = existingCustomer.tags
        ? existingCustomer.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [];
      const newTags = tags
        ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [];
      const mergedTags = Array.from(new Set([...currentTags, ...newTags])).join(", ");

      const data = await updateCustomerTags(existingCustomer.id, mergedTags);
      return NextResponse.json(
        { success: true, exists: true, data },
        { headers: withCorsHeaders() },
      );
    }

    const data = await createCustomer(email, firstName, tags);
    return NextResponse.json(
      { success: true, exists: false, data },
      { headers: withCorsHeaders() },
    );
  } catch (error) {
    console.error("SHEMA create-customer route error:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la création du compte client",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: withCorsHeaders() },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: withCorsHeaders(),
  });
}
