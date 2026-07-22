import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BASE_PRICES = {
  onsite: 90,
  mobile: 110,
};

const DISCOUNTS = {
  payg: 0,
  "3mo": 0.05,
  "6mo": 0.10,
};

const PACKAGE_LABELS = {
  payg: "Pay As You Go",
  "3mo": "3-Month Commitment",
  "6mo": "6-Month Commitment",
};

const LOCATION_LABELS = {
  onsite: "On-Site (Ashburn, VA)",
  mobile: "Mobile (Ashburn to Fairfax)",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { location, packageType, sessions, freq, duo, duoSinglePayment } = req.body;

  if (!location || !packageType || !sessions || !freq) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const base = BASE_PRICES[location];
    const discount = DISCOUNTS[packageType];
    const basePerSession = base * (1 - discount);
    const duoAddon = duo ? 15 : 0;
    const totalPerSessionFull = basePerSession + duoAddon;

    // If duo + single payment: charge full couple total on one card
    // If duo + per person: charge half each
    // If no duo: charge base rate
    let chargePerSession;
    if (duo && duoSinglePayment) {
      chargePerSession = totalPerSessionFull; // full couple amount on one card
    } else if (duo && !duoSinglePayment) {
      chargePerSession = totalPerSessionFull / 2; // per person
    } else {
      chargePerSession = basePerSession;
    }

    const monthlyAmount = Math.round(chargePerSession * sessions * 100); // cents
    const pricePerSession = (Math.round(chargePerSession * 100) / 100).toFixed(2);

    const duoLabel = duo ? " · Duo Training" : "";

    const productName = `The MF Coach — ${LOCATION_LABELS[location]} · ${PACKAGE_LABELS[packageType]} · ${freq}${duoLabel}`;

    const isRecurring = true;

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
              description: isRecurring
                ? `Billed monthly. ${duo && duoSinglePayment ? "Full couple price on one card. " : duo ? "Per person price. " : ""}Commitment enforced via signed training agreement.`
                : `One-time payment. ${duo && duoSinglePayment ? "Full couple price on one card." : duo ? "Per person price." : ""}`,
            },
            unit_amount: monthlyAmount,
            ...(isRecurring && { recurring: { interval: "month" } }),
          },
          quantity: 1,
        },
      ],
      mode: isRecurring ? "subscription" : "payment",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/#pricing`,
      metadata: {
        location,
        packageType,
        sessions: String(sessions),
        sessionsAmount: String(sessions),
        freq,
        duo: String(duo),
        duoSinglePayment: String(duoSinglePayment ?? false),
        pricePerSession: pricePerSession,
        pricePerSessionCents: String(Math.round(chargePerSession * 100)),
      },
      ...(isRecurring && {
        subscription_data: {
          metadata: {
            location,
            packageType,
            sessions: String(sessions),
            sessionsAmount: String(sessions),
            freq,
            duo: String(duo),
            duoSinglePayment: String(duoSinglePayment ?? false),
            pricePerSession: pricePerSession,
            pricePerSessionCents: String(Math.round(chargePerSession * 100)),
          },
        },
      }),
    });

    res.status(200).json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}
