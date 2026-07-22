import { useState } from "react";

const ONSITE = {
  label: "On-Site",
  emoji: "🏋️",
  subtitle: "44675 Cape Ct STE 185, Ashburn, VA 20147",
  base: 90,
  rows: [
    { freq: "2× / Week", sessions: 8 },
    { freq: "3× / Week", sessions: 12 },
    { freq: "4× / Week", sessions: 16 },
  ],
};

const MOBILE = {
  label: "Mobile",
  emoji: "📍",
  subtitle: "Ashburn to Fairfax",
  base: 110,
  rows: [
    { freq: "2× / Week", sessions: 8 },
    { freq: "3× / Week", sessions: 12 },
    { freq: "4× / Week", sessions: 16 },
  ],
};

const PACKAGES = [
  { key: "payg", name: "Pay As You Go", sub: "No contract", discount: 0, badge: null },
  { key: "3mo", name: "3-Month", sub: "Monthly billing", discount: 0.05, badge: "SAVE 5%" },
  { key: "6mo", name: "6-Month", sub: "Monthly billing", discount: 0.10, badge: "SAVE 10%" },
];

function fmt(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}
function fmtDec(n) {
  const r = Math.round(n * 100) / 100;
  return "$" + (r % 1 === 0 ? r.toFixed(0) : r.toFixed(2));
}
function th(featured, isLabel) {
  return {
    background: isLabel ? "#101010" : featured ? "rgba(0,255,65,0.08)" : "#161616",
    borderTop: featured ? "2px solid #00FF41" : "2px solid transparent",
    padding: "14px 16px",
    textAlign: isLabel ? "left" : "center",
    fontWeight: "normal",
    borderRadius: "6px 6px 0 0",
  };
}
function tdLabel() {
  return { background: "#161616", padding: "14px 16px", verticalAlign: "middle", borderRadius: 4, minWidth: 130 };
}
function tdCell(featured) {
  return { background: featured ? "rgba(0,255,65,0.08)" : "#161616", padding: "14px 16px", textAlign: "center", verticalAlign: "middle", borderRadius: 4 };
}
function infoBox() {
  return { background: "#161616", border: "1px solid #252525", borderRadius: 10, padding: "22px 24px" };
}
function infoTitle() {
  return { fontWeight: 800, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#00FF41", marginBottom: 14 };
}

function PricingGrid({ location, duoEnabled, loadingKey, onCheckout }) {
  const loc = location === "onsite" ? ONSITE : MOBILE;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontWeight: 800, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#666" }}>
          {loc.emoji} {loc.label} Training — {loc.subtitle}
        </span>
        <div style={{ flex: 1, height: 1, background: "#252525" }} />
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 2, minWidth: 560 }}>
          <thead>
            <tr>
              <th style={th(false, true)}>Frequency</th>
              {PACKAGES.map((pkg) => (
                <th key={pkg.key} style={th(pkg.key === "3mo", false)}>
                  <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: pkg.key === "3mo" ? "#00FF41" : "#eee", marginBottom: 2 }}>{pkg.name}</div>
                  <div style={{ fontSize: 10, color: "#666", fontWeight: 500 }}>{pkg.sub}</div>
                  {pkg.badge && (
                    <div style={{ display: "inline-block", background: pkg.key === "3mo" ? "#00FF41" : "#333", color: pkg.key === "3mo" ? "#000" : "#ccc", fontSize: 9, fontWeight: 800, letterSpacing: 1, padding: "2px 7px", borderRadius: 2, marginTop: 5 }}>
                      {pkg.badge}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loc.rows.map((row) => (
              <tr key={row.freq}>
                <td style={tdLabel()}>
                  <div style={{ fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: 0.3 }}>{row.freq}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{row.sessions} sessions/mo</div>
                </td>
                {PACKAGES.map((pkg) => {
                  const basePerSession = loc.base * (1 - pkg.discount);
                  const duoAddon = duoEnabled ? 15 : 0;
                  const totalPerSession = basePerSession + duoAddon;
                  const perPersonPerSession = duoEnabled ? totalPerSession / 2 : totalPerSession;
                  const monthly = perPersonPerSession * row.sessions;
                  const totalCharge = duoEnabled ? monthly * 2 : monthly;
                  const featured = pkg.key === "3mo";
                  const key = `${location}-${pkg.key}-${row.sessions}-${duoEnabled}`;
                  const isLoading = loadingKey === key;
                  return (
                    <td key={pkg.key} style={tdCell(featured)}>
                      <div style={{ fontWeight: 800, fontSize: 26, color: featured ? "#00FF41" : "#fff", lineHeight: 1, letterSpacing: 0.5 }}>{fmt(monthly)}</div>
                      <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{duoEnabled ? "/month per person" : "/month"}</div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                        <strong style={{ color: featured ? "#7CFF9E" : "#aaa" }}>{fmtDec(perPersonPerSession)}</strong>{" "}
                        {duoEnabled ? "per session per person" : "per session"}
                      </div>
                      <button
                        onClick={() => onCheckout({ location, packageType: pkg.key, sessions: row.sessions, freq: row.freq, duo: duoEnabled, key })}
                        disabled={isLoading}
                        style={{
                          display: "inline-block", marginTop: 10, padding: "6px 14px",
                          background: featured ? "#00FF41" : "#1e1e1e",
                          color: featured ? "#000" : "#aaa",
                          fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase",
                          borderRadius: 4, border: featured ? "none" : "1px solid #2a2a2a",
                          cursor: isLoading ? "not-allowed" : "pointer",
                          opacity: isLoading ? 0.6 : 1, fontFamily: "inherit", transition: "opacity 0.15s",
                        }}
                      >
                        {isLoading ? "Loading..." : "Get Started"}
                      </button>
                      {/* Duo disclaimer — shows total charge so client isn't surprised */}
                      {duoEnabled && (
                        <div style={{ fontSize: 10, color: "#555", marginTop: 6, lineHeight: 1.4 }}>
                          Total billed: <strong style={{ color: "#888" }}>{fmt(totalCharge)}/mo</strong> (×2 for both)
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [tab, setTab] = useState("onsite");
  const [duoEnabled, setDuoEnabled] = useState(false);
  const [loadingKey, setLoadingKey] = useState(null);
  const [error, setError] = useState(null);

  async function handleCheckout({ location, packageType, sessions, freq, duo, key }) {
    setLoadingKey(key);
    setError(null);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // duoSinglePayment: true tells the API to charge per-person × 2
        body: JSON.stringify({ location, packageType, sessions, freq, duo, duoSinglePayment: duo }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <section style={{ background: "#121212", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "56px 24px", fontFamily: "inherit", boxShadow: "0 0 40px rgba(0,255,65,0.08)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontWeight: 800, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#00FF41", marginBottom: 10 }}>Transparent Pricing</div>
          <h2 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "#fff", letterSpacing: 1, lineHeight: 1.05, margin: 0 }}>
            Train With<br /><span style={{ color: "#00FF41" }}>The MF Coach</span>
          </h2>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", background: "#0B0B0B", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, overflow: "hidden" }}>
            {[{ key: "onsite", label: "🏋️ On-Site" }, { key: "mobile", label: "📍 Mobile" }].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                style={{ padding: "10px 28px", fontSize: 13, fontWeight: 700, background: tab === t.key ? "#00FF41" : "transparent", color: tab === t.key ? "#000" : "#9CA3AF", border: "none", cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit", letterSpacing: 0.3 }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <button onClick={() => setDuoEnabled((p) => !p)}
            style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.16)", background: duoEnabled ? "#00FF41" : "#0B0B0B", color: duoEnabled ? "#000" : "#9CA3AF", fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s ease", fontFamily: "inherit" }}>
            {duoEnabled ? "Duo Training: On (+$15/session total, split between 2)" : "Duo Training: Off"}
          </button>
        </div>

        {error && <div style={{ textAlign: "center", color: "#ff4444", fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <PricingGrid location={tab} duoEnabled={duoEnabled} loadingKey={loadingKey} onCheckout={handleCheckout} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <div style={infoBox()}>
            <div style={infoTitle()}>💳 Payment Methods</div>
            {[
              { icon: "🔄", name: "ACH Bank Transfer", desc: "Connect your bank via Stripe. Auto-billed monthly. Nearly zero fee.", fee: "Included" },
              { icon: "💳", name: "Credit / Debit Card", desc: "Auto-billed monthly via Stripe. Processing fee already included in listed prices.", fee: "Included" },
            ].map((m) => (
              <div key={m.name} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid #1f1f1f" }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: "#1c1c1c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 2 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{m.desc}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#00FF41", whiteSpace: "nowrap", alignSelf: "center" }}>{m.fee}</div>
              </div>
            ))}
            <div style={{ paddingTop: 12, fontSize: 11, color: "#444" }}>All commitment packages require a signed training agreement.</div>
          </div>

          {/* ── DUO BOX — only text updated ── */}
          <div style={infoBox()}>
            <div style={infoTitle()}>👫 Duo Training</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {PACKAGES.map((pkg) => (
                <div key={pkg.key} style={{ background: pkg.key === "3mo" ? "rgba(0,255,65,0.08)" : "#1c1c1c", border: `1px solid ${pkg.key === "3mo" ? "#00FF41" : "#252525"}`, borderRadius: 8, padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: pkg.key === "3mo" ? "#00FF41" : "#555", marginBottom: 4 }}>{pkg.name}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1 }}>+$15</div>
                  <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>per session total</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#1c1c1c", borderLeft: "3px solid #00FF41", borderRadius: 4, padding: "10px 12px", fontSize: 12, color: "#666", lineHeight: 1.6 }}>
              Prices shown are per person. Both partners must pay from the <strong style={{ color: "#aaa" }}>same card or bank account</strong>. At checkout, your per-person total is automatically multiplied by 2 to cover both people under one payment.
              <div style={{ marginTop: 6, color: "#888" }}>
                <strong style={{ color: "#aaa" }}>Example:</strong> On-Site 3-Month 3×/week →{" "}
                <strong style={{ color: "#00FF41" }}>($1,026 + $180) ÷ 2 = $603/mo per person</strong>
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: "#444" }}>Other frequencies available — ask during your free assessment.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
