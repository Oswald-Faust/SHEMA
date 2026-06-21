import { NextRequest, NextResponse } from "next/server";

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || "2025-04";

type CreateCustomerBody = {
  email?: string;
  firstName?: string;
  tags?: string;
};

function getShopifyHeaders() {
  return {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": ADMIN_TOKEN as string,
  };
}

async function searchCustomerByEmail(email: string) {
  const url =
    `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/customers/search.json?query=` +
    encodeURIComponent(`email:${email}`);

  const res = await fetch(url, {
    method: "GET",
    headers: getShopifyHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Shopify search failed: ${res.status}`);
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
      headers: getShopifyHeaders(),
      body: JSON.stringify({
        customer: {
          id: customerId,
          tags,
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Shopify update failed: ${res.status}`);
  }

  return res.json();
}

async function createCustomer(email: string, firstName: string, tags: string) {
  const res = await fetch(
    `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/customers.json`,
    {
      method: "POST",
      headers: getShopifyHeaders(),
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
    throw new Error(`Shopify create failed: ${res.status}`);
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Configuration Shopify serveur manquante" },
      { status: 500 },
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
        { status: 400 },
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
      return NextResponse.json({ success: true, exists: true, data });
    }

    const data = await createCustomer(email, firstName, tags);
    return NextResponse.json({ success: true, exists: false, data });
  } catch (error) {
    console.error("SHEMA create-customer route error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du compte client" },
      { status: 500 },
    );
  }
}
