import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

const sfData = [
  { year: "1994", medianPrice: 290, millionaires: 12 },
  { year: "1995", medianPrice: 295, millionaires: 18 },
  { year: "1996", medianPrice: 310, millionaires: 32 },
  { year: "1997", medianPrice: 350, millionaires: 58 },
  { year: "1998", medianPrice: 410, millionaires: 95 },
  { year: "1999", medianPrice: 520, millionaires: 172 },
  { year: "2000", medianPrice: 640, millionaires: 258 },
  { year: "2001", medianPrice: 580, millionaires: 105 },
  { year: "2002", medianPrice: 550, millionaires: 78 },
  { year: "2003", medianPrice: 570, millionaires: 82 },
  { year: "2004", medianPrice: 650, millionaires: 95 },
  { year: "2005", medianPrice: 760, millionaires: 110 },
  { year: "2006", medianPrice: 830, millionaires: 125 },
  { year: "2007", medianPrice: 870, millionaires: 130 },
  { year: "2008", medianPrice: 650, millionaires: 72 },
];

const dubaiData = [
  { year: "2016", pricePerSqFt: 165, cryptoWealth: 2 },
  { year: "2017", pricePerSqFt: 155, cryptoWealth: 18 },
  { year: "2018", pricePerSqFt: 140, cryptoWealth: 6 },
  { year: "2019", pricePerSqFt: 130, cryptoWealth: 4 },
  { year: "2020", pricePerSqFt: 125, cryptoWealth: 12 },
  { year: "2021", pricePerSqFt: 175, cryptoWealth: 68 },
  { year: "2022", pricePerSqFt: 220, cryptoWealth: 42 },
  { year: "2023", pricePerSqFt: 295, cryptoWealth: 58 },
  { year: "2024", pricePerSqFt: 365, cryptoWealth: 85 },
  { year: "2025", pricePerSqFt: 410, cryptoWealth: 110 },
];

const rockiesData = [
  { year: "2022", medianPrice: 380, aiWealth: 2, projected: false },
  { year: "2023", medianPrice: 410, aiWealth: 8, projected: false },
  { year: "2024", medianPrice: 455, aiWealth: 22, projected: false },
  { year: "2025", medianPrice: 510, aiWealth: 45, projected: false },
  { year: "2026", medianPrice: 580, aiWealth: 85, projected: true },
  { year: "2027", medianPrice: 690, aiWealth: 145, projected: true },
  { year: "2028", medianPrice: 840, aiWealth: 230, projected: true },
  { year: "2029", medianPrice: 1020, aiWealth: 340, projected: true },
  { year: "2030", medianPrice: 1250, aiWealth: 480, projected: true },
  { year: "2031", medianPrice: 1500, aiWealth: 620, projected: true },
  { year: "2032", medianPrice: 1780, aiWealth: 780, projected: true },
];

const CustomTooltipSF = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(15,23,42,0.95)", padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(99,102,241,0.3)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
        <p style={{ color: "#e2e8f0", fontWeight: 600, margin: "0 0 6px 0", fontSize: 13 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, margin: "2px 0", fontSize: 12 }}>
            {p.name}: {p.name.includes("Millionaires") ? `${p.value}K new` : `$${p.value}K`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomTooltipDubai = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(15,23,42,0.95)", padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(245,158,11,0.3)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
        <p style={{ color: "#e2e8f0", fontWeight: 600, margin: "0 0 6px 0", fontSize: 13 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, margin: "2px 0", fontSize: 12 }}>
            {p.name}: {p.name.includes("Crypto") ? `$${p.value}B` : `$${p.value}/sqft`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomTooltipRockies = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(15,23,42,0.95)", padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(16,185,129,0.3)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
        <p style={{ color: "#e2e8f0", fontWeight: 600, margin: "0 0 6px 0", fontSize: 13 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, margin: "2px 0", fontSize: 12 }}>
            {p.name}: {p.name.includes("AI") ? `$${p.value}B` : `$${p.value}K`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function WealthBoomRealEstate() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Dotcom → SF", color: "#818cf8", emoji: "💻" },
    { label: "Crypto → Dubai", color: "#f59e0b", emoji: "₿" },
    { label: "AI → N. Rockies", color: "#10b981", emoji: "🤖" },
  ];

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      minHeight: "100vh",
      padding: "32px 24px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#e2e8f0",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <p style={{ color: "#94a3b8", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, margin: "0 0 8px 0" }}>Wealth Migration & Real Estate</p>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            margin: "0 0 6px 0",
            background: "linear-gradient(90deg, #818cf8, #f59e0b, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}>
            Three Booms. Three Cities. One Pattern.
          </h1>
          <p style={{ color: "#64748b", fontSize: 13, margin: 0, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            How concentrated wealth creation from tech revolutions transforms local real estate markets
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "24px 0 20px 0" }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: activeTab === i ? `2px solid ${tab.color}` : "2px solid rgba(100,116,139,0.2)",
                background: activeTab === i ? `${tab.color}15` : "rgba(30,41,59,0.5)",
                color: activeTab === i ? tab.color : "#94a3b8",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.3s ease",
                backdropFilter: "blur(8px)",
              }}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* CHART 1: Dotcom → San Francisco */}
        {activeTab === 0 && (
          <div style={{ background: "rgba(30,41,59,0.5)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(129,140,248,0.15)" }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px 0", color: "#818cf8" }}>
                💻 The Dotcom Boom & San Francisco Real Estate
              </h2>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>
                1994–2008 · Median Home Price ($K) vs. New Bay Area Millionaires (thousands)
              </p>
            </div>

            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={sfData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sfBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="sfLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} />
                <YAxis yAxisId="left" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} label={{ value: "Home Price ($K)", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11, dx: -5 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} label={{ value: "New Millionaires (K)", angle: 90, position: "insideRight", fill: "#94a3b8", fontSize: 11, dx: 5 }} />
                <Tooltip content={<CustomTooltipSF />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <ReferenceLine x="2000" yAxisId="left" stroke="#818cf8" strokeDasharray="6 4" strokeOpacity={0.5} label={{ value: "PEAK", fill: "#818cf8", fontSize: 10, position: "top" }} />
                <Bar yAxisId="right" dataKey="millionaires" name="New Millionaires (K)" fill="url(#sfBar)" radius={[4, 4, 0, 0]} barSize={32} />
                <Line yAxisId="left" type="monotone" dataKey="medianPrice" name="Median Home Price ($K)" stroke="url(#sfLine)" strokeWidth={3} dot={{ fill: "#ec4899", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#ec4899" }} />
              </ComposedChart>
            </ResponsiveContainer>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              {[
                { val: "2.2×", label: "Home price increase", sub: "1994 → 2000" },
                { val: "258K", label: "New millionaires at peak", sub: "Year 2000" },
                { val: "$640K", label: "Median home price at peak", sub: "vs. $290K in 1994" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(129,140,248,0.08)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#818cf8" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#cbd5e1", fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHART 2: Crypto → Dubai */}
        {activeTab === 1 && (
          <div style={{ background: "rgba(30,41,59,0.5)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(245,158,11,0.15)" }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px 0", color: "#f59e0b" }}>
                ₿ The Crypto Boom & Dubai Real Estate
              </h2>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>
                2016–2025 · Price per Sq Ft (USD) vs. Crypto Wealth Flowing into UAE ($B)
              </p>
            </div>

            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={dubaiData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="dubaiBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="dubaiArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} />
                <YAxis yAxisId="left" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} label={{ value: "Price/SqFt ($)", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11, dx: -5 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} label={{ value: "Crypto Wealth ($B)", angle: 90, position: "insideRight", fill: "#94a3b8", fontSize: 11, dx: 5 }} />
                <Tooltip content={<CustomTooltipDubai />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <ReferenceLine x="2021" yAxisId="left" stroke="#f59e0b" strokeDasharray="6 4" strokeOpacity={0.5} label={{ value: "BTC ATH", fill: "#f59e0b", fontSize: 10, position: "top" }} />
                <Bar yAxisId="right" dataKey="cryptoWealth" name="Crypto Wealth Inflow ($B)" fill="url(#dubaiBar)" radius={[4, 4, 0, 0]} barSize={36} />
                <Line yAxisId="left" type="monotone" dataKey="pricePerSqFt" name="Avg Price/SqFt ($)" stroke="#fb923c" strokeWidth={3} dot={{ fill: "#fb923c", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#fb923c" }} />
              </ComposedChart>
            </ResponsiveContainer>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              {[
                { val: "3.3×", label: "Price/sqft increase", sub: "2019 low → 2025" },
                { val: "$110B", label: "Crypto capital inflow", sub: "Cumulative by 2025" },
                { val: "0% tax", label: "Key magnet", sub: "No income/capital gains tax" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(245,158,11,0.08)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#cbd5e1", fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHART 3: AI → Northern Rockies */}
        {activeTab === 2 && (
          <div style={{ background: "rgba(30,41,59,0.5)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(16,185,129,0.15)" }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px 0", color: "#10b981" }}>
                🤖 The AI Boom & Northern Rockies Real Estate
              </h2>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>
                2022–2032 · Median Home Price ($K) vs. AI-Generated Wealth ($B) · Bozeman / Jackson / Sun Valley corridor
              </p>
            </div>

            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={rockiesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rockiesBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="rockiesBarProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} />
                <YAxis yAxisId="left" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} label={{ value: "Home Price ($K)", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11, dx: -5 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "rgba(100,116,139,0.2)" }} label={{ value: "AI Wealth ($B)", angle: 90, position: "insideRight", fill: "#94a3b8", fontSize: 11, dx: 5 }} />
                <Tooltip content={<CustomTooltipRockies />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <ReferenceLine x="2026" yAxisId="left" stroke="#10b981" strokeDasharray="6 4" strokeOpacity={0.5} label={{ value: "PROJECTED →", fill: "#10b981", fontSize: 10, position: "top" }} />
                <Bar yAxisId="right" dataKey="aiWealth" name="AI-Generated Wealth ($B)" fill="url(#rockiesBar)" radius={[4, 4, 0, 0]} barSize={32} />
                <Line yAxisId="left" type="monotone" dataKey="medianPrice" name="Median Home Price ($K)" stroke="#34d399" strokeWidth={3} dot={(props) => {
                  const { cx, cy, index } = props;
                  const isProjected = rockiesData[index]?.projected;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={isProjected ? "transparent" : "#34d399"}
                      stroke="#34d399"
                      strokeWidth={isProjected ? 2 : 0}
                      strokeDasharray={isProjected ? "3 2" : "none"}
                    />
                  );
                }} />
              </ComposedChart>
            </ResponsiveContainer>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              {[
                { val: "4.7×", label: "Projected price increase", sub: "2022 → 2032" },
                { val: "$780B", label: "AI wealth by 2032", sub: "Remote-first founders & engineers" },
                { val: "~35%", label: "Projected annual growth", sub: "Peak years 2027–2030" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(16,185,129,0.08)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#10b981" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#cbd5e1", fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(16,185,129,0.06)", borderRadius: 8, border: "1px dashed rgba(16,185,129,0.2)" }}>
              <p style={{ color: "#94a3b8", fontSize: 11, margin: 0, lineHeight: 1.5 }}>
                <span style={{ color: "#10b981", fontWeight: 700 }}>Thesis:</span> Remote-first AI companies + newly wealthy founders seeking quality of life = migration to Bozeman, Jackson Hole, Sun Valley, Whitefish corridor. Low state taxes (MT/WY), fiber internet buildout, private aviation access, and lifestyle appeal mirror the same forces that pulled crypto wealth to Dubai.
              </p>
            </div>
          </div>
        )}

        {/* The Pattern */}
        <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(30,41,59,0.4)", borderRadius: 12, border: "1px solid rgba(100,116,139,0.15)" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 8px 0", color: "#e2e8f0", textTransform: "uppercase", letterSpacing: 1 }}>The Recurring Pattern</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            {[
              { step: "01", title: "Wealth Creation", desc: "New technology creates unprecedented concentrated wealth", icon: "💰" },
              { step: "02", title: "Lifestyle Migration", desc: "Newly wealthy seek ideal location with tax & quality-of-life advantages", icon: "✈️" },
              { step: "03", title: "Price Explosion", desc: "Cash buyers flood limited housing supply, pricing out locals", icon: "📈" },
              { step: "04", title: "Ecosystem Lock-in", desc: "Restaurants, schools, services upgrade — attracting even more wealth", icon: "🔒" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700 }}>{s.step}</div>
                <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600, margin: "2px 0" }}>{s.title}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#475569", fontSize: 10, marginTop: 16 }}>
          Data sources: NAR, Zillow, Chainalysis, CBRE, Knight Frank · Projections are illustrative estimates · Not financial advice
        </p>
      </div>
    </div>
  );
}