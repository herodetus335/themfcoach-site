import Stripe from "stripe";

/**
 * Special one-time checkout — does NOT use or change main site pricing.
 * On-Site PAYG · 1× / Week · $90 per session · single session · mode: payment
 *
 * Shareable: GET /api/create-one-time-payg-1x  → redirects to Stripe
 * Or POST same path → JSON { url }
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_PER_SESSION = 90;
const SESSIONS = 1;
const FREQ = "1× / Week";
const LOCATION = "onsite";
const PACKAGE_TYPE = "payg";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chargePerSession = PRICE_PER_SESSION;
    const totalCents = Math.round(chargePerSession * SESSIONS * 100);
    const pricePerSession = chargePerSession.toFixed(2);

    const origin =
      (typeof req.headers.origin === "string" && req.headers.origin) ||
      (typeof req.headers.referer === "string" && new URL(req.headers.referer).origin) ||
      process.env.SITE_URL ||
      "https://themfcoachweb.com";

    const productName = `The MF Coach — On-Site (Ashburn, VA) · Pay As You Go · ${FREQ} · One-Time`;

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "us_bank_account"],
      phone_number_collection: { enabled: true },
      name_collection: {
        individual: {
          enabled: true,
          optional: false,
        },
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description:
                "One-time payment for 1 session at $90. Pay as you go · 1× / week schedule. Training agreement required.",
            },
            unit_amount: totalCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      metadata: {
        location: LOCATION,
        packageType: PACKAGE_TYPE,
        sessions: String(SESSIONS),
        sessionsAmount: String(SESSIONS),
        freq: FREQ,
        duo: "false",
        duoSinglePayment: "false",
        pricePerSession,
        pricePerSessionCents: String(Math.round(chargePerSession * 100)),
        oneTime: "true",
        specialOffer: "payg-1x-90",
      },
    });

    if (req.method === "GET") {
      return res.redirect(303, checkoutSession.url);
    }

    return res.status(200).json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Stripe one-time PAYG 1x error:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
