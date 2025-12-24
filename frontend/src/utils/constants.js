export const SITE_CONFIG = {
  // Use explicit env var when set, otherwise use '/api' so Vite dev proxy works
  apiBase: import.meta.env.VITE_API_BASE_URL || '/api',
  company: import.meta.env.VITE_COMPANY_NAME || "DKS.Power",
  address: import.meta.env.VITE_COMPANY_ADDRESS || "10 9 NIRMAL COMPLEX NEAR ROSHAN HOSPITAL RAISEN ROAD BHOPAL (MP) - 462923",
  phone: [import.meta.env.VITE_COMPANY_PHONE || "+91 9893636226"],
  email: import.meta.env.VITE_COMPANY_EMAIL || "dksmarketing2016@gmail.com",
};

export const SCHEMES = [
  {
    id: 1,
    title: "PM Surya Ghar Muft Bijli Yojana",
    subtitle: "Up to 300 Units Free Electricity",
    subsidy: "₹78,000 (3kW)",
    desc: "Get rooftop solar for your home with central subsidy and lower monthly electricity bills.",
    icon: "🏠",
    color: "#1E7F4F",
  },
  {
    id: 2,
    title: "PM KUSUM Yojana",
    subtitle: "Solar Pumps for Farmers",
    subsidy: "60% Subsidy + 30% Loan",
    desc: "Install solar pumps for agriculture with low upfront cost and protection from diesel prices.",
    icon: "🌾",
    color: "#FFC107",
  },
  {
    id: 3,
    title: "MNRE Rooftop Solar",
    subtitle: "Grid Connected Systems",
    subsidy: "40% up to 3kW",
    desc: "Central subsidy for grid‑connected rooftop solar systems with net metering.",
    icon: "🏢",
    color: "#1E7F4F",
  },
];
