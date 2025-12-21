export const SITE_CONFIG = {
  apiBase: import.meta.env.VITE_API_BASE_URL,
  company: import.meta.env.VITE_COMPANY_NAME || "DKS.Power",
  address: import.meta.env.VITE_COMPANY_ADDRESS || "Bhopal, Madhya Pradesh",
  phone: [import.meta.env.VITE_COMPANY_PHONE || "+91 9893636226"],
  email: import.meta.env.VITE_COMPANY_EMAIL || "dkspower@gmail..com",
};

export const SCHEMES = [
  {
    id: 1,
    title: "PM Surya Ghar Muft Bijli Yojana",
    subtitle: "Up to 300 Units Free Electricity",
    subsidy: "₹78,000 (3kW)",
    desc: "Get rooftop solar for your home with central subsidy and lower monthly electricity bills.",
    icon: "🏠",
    color: "#10b981",
  },
  {
    id: 2,
    title: "PM KUSUM Yojana",
    subtitle: "Solar Pumps for Farmers",
    subsidy: "60% Subsidy + 30% Loan",
    desc: "Install solar pumps for agriculture with low upfront cost and protection from diesel prices.",
    icon: "🌾",
    color: "#f59e0b",
  },
  {
    id: 3,
    title: "MNRE Rooftop Solar",
    subtitle: "Grid Connected Systems",
    subsidy: "40% up to 3kW",
    desc: "Central subsidy for grid‑connected rooftop solar systems with net metering.",
    icon: "🏢",
    color: "#3b82f6",
  },
];
