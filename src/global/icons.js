import {
  FaHandshake,
  FaChartLine,
  FaSeedling,
  FaCoins,
  FaBuilding,
  FaUsers,
  FaBalanceScale,
  FaGraduationCap,
  FaNetworkWired,
  FaBullhorn,
} from "react-icons/fa";

export const SERVICE_ICONS = {
  development: FaUsers,
  business: FaChartLine,
  agriculture: FaSeedling,
  finance: FaCoins,
  property: FaBuilding,
  general: FaHandshake,
};

export const BENEFIT_ICONS = {
  voice: FaBullhorn,
  governance: FaBalanceScale,
  business: FaChartLine,
  finance: FaCoins,
  training: FaGraduationCap,
  network: FaNetworkWired,
};

export const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
