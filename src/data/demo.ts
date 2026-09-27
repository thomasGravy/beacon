// Fictional demo data. Replace these arrays with your API calls.

export type Plan = "Starter" | "Growth" | "Scale" | "Enterprise";
export type CustomerStatus = "Active" | "Trial" | "Past due" | "Churned";

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: Plan;
  status: CustomerStatus;
  mrr: number;
  country: string;
  joined: string;
  lastSeen: string;
};

const firstNames = ["Olivia", "Liam", "Emma", "Noah", "Ava", "Lucas", "Mia", "Ethan", "Sofia", "Mateo", "Chloé", "Arjun", "Hannah", "Yuki", "Leila", "Oscar", "Nora", "Felix", "Amara", "Jonas", "Elena", "Diego", "Freya", "Kenji"];
const lastNames = ["Martin", "Nguyen", "Schmidt", "Rossi", "Kowalski", "Haddad", "Silva", "Andersen", "Dubois", "Tanaka", "Okafor", "Patel", "Novak", "García", "Berg", "Moreau"];
const companies = ["Northwind", "Brightpath", "Lumen Labs", "Keystone", "Pineapple AI", "Orbit Logistics", "Fieldnote", "Cobalt Health", "Harbor & Co", "Quanta", "Sprout Studio", "Mosaic", "Tidewater", "Parcel", "Evergreen", "Nimbus"];
const countries = ["United States", "Germany", "France", "United Kingdom", "Canada", "Netherlands", "Belgium", "Japan", "Brazil", "Spain", "Sweden", "Australia"];
const plans: { plan: Plan; mrr: number }[] = [
  { plan: "Starter", mrr: 29 },
  { plan: "Growth", mrr: 99 },
  { plan: "Scale", mrr: 299 },
  { plan: "Enterprise", mrr: 1200 },
];
// A fixed rotation keeps a realistic mix of statuses in the demo
const statusCycle: CustomerStatus[] = ["Active", "Active", "Trial", "Active", "Past due", "Active", "Active", "Churned", "Active", "Trial", "Active", "Active"];

/** Small deterministic pseudo-random generator so the demo looks the same on every load. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const rand = seeded(42);
const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)];
const today = new Date("2026-09-27T12:00:00Z");
const daysAgo = (days: number) => new Date(today.getTime() - days * 86_400_000).toISOString();

export const customers: Customer[] = Array.from({ length: 48 }, (_, index) => {
  const first = pick(firstNames);
  const last = pick(lastNames);
  const company = pick(companies);
  const { plan, mrr } = pick(plans);
  const status = statusCycle[index % statusCycle.length];
  const seats = 1 + Math.floor(rand() * 4);
  return {
    id: `cus_${(1042 + index).toString(36)}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}@${company.toLowerCase().replace(/[^a-z]/g, "")}.example`,
    company,
    plan,
    status,
    mrr: status === "Churned" ? 0 : status === "Trial" ? 0 : mrr * seats,
    country: pick(countries),
    joined: daysAgo(30 + Math.floor(rand() * 700)),
    lastSeen: daysAgo(Math.floor(rand() * 20)),
  };
});

export const kpis = [
  { label: "Monthly recurring revenue", value: 48_210, format: "currency" as const, change: 12.4, trend: [31, 33, 32, 36, 38, 37, 41, 43, 42, 45, 46, 48] },
  { label: "Active customers", value: 1_284, format: "number" as const, change: 5.2, trend: [980, 1010, 1032, 1060, 1085, 1100, 1128, 1160, 1190, 1225, 1250, 1284] },
  { label: "Average revenue per user", value: 37.5, format: "currency" as const, change: 3.1, trend: [32, 32.5, 33, 33.4, 34, 34.2, 35, 35.3, 36, 36.4, 37, 37.5] },
  { label: "Churn rate", value: 2.1, format: "percent" as const, change: -0.4, trend: [3.2, 3.1, 3, 2.9, 2.8, 2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1] },
];

export const revenueByMonth = [
  { month: "Oct", thisYear: 31_200, lastYear: 22_100 },
  { month: "Nov", thisYear: 32_800, lastYear: 23_400 },
  { month: "Dec", thisYear: 32_100, lastYear: 24_900 },
  { month: "Jan", thisYear: 35_600, lastYear: 25_300 },
  { month: "Feb", thisYear: 37_900, lastYear: 26_800 },
  { month: "Mar", thisYear: 37_200, lastYear: 27_500 },
  { month: "Apr", thisYear: 40_800, lastYear: 28_100 },
  { month: "May", thisYear: 42_600, lastYear: 29_900 },
  { month: "Jun", thisYear: 41_900, lastYear: 30_400 },
  { month: "Jul", thisYear: 44_700, lastYear: 31_000 },
  { month: "Aug", thisYear: 46_300, lastYear: 32_600 },
  { month: "Sep", thisYear: 48_210, lastYear: 33_900 },
];

export const revenueByPlan = [
  { plan: "Enterprise", value: 19_200 },
  { plan: "Scale", value: 14_650 },
  { plan: "Growth", value: 10_890 },
  { plan: "Starter", value: 3_470 },
];

export const pipeline = [
  { stage: "Lead", deals: 42, value: 126_000 },
  { stage: "Qualified", deals: 27, value: 98_500 },
  { stage: "Proposal", deals: 14, value: 71_200 },
  { stage: "Negotiation", deals: 8, value: 46_800 },
  { stage: "Won", deals: 11, value: 58_300 },
];

export type Transaction = { id: string; customer: string; plan: Plan; amount: number; status: "Paid" | "Pending" | "Failed"; date: string };

export const transactions: Transaction[] = [
  { id: "in_8f2a", customer: "Northwind", plan: "Enterprise", amount: 3600, status: "Paid", date: daysAgo(0) },
  { id: "in_8f29", customer: "Lumen Labs", plan: "Scale", amount: 897, status: "Paid", date: daysAgo(0) },
  { id: "in_8f28", customer: "Parcel", plan: "Growth", amount: 198, status: "Pending", date: daysAgo(1) },
  { id: "in_8f27", customer: "Cobalt Health", plan: "Scale", amount: 598, status: "Failed", date: daysAgo(1) },
  { id: "in_8f26", customer: "Sprout Studio", plan: "Starter", amount: 58, status: "Paid", date: daysAgo(2) },
  { id: "in_8f25", customer: "Keystone", plan: "Growth", amount: 297, status: "Paid", date: daysAgo(3) },
];

export const currentUser = { name: "Clara Moreau", email: "clara@beacon.example", role: "Admin" };
