export interface IndianState {
  code: string;
  name: string;
  type: "State" | "Union Territory";
  capital: string;
}

export interface LocationCityItem {
  id: string;
  name: string;
  slug: string;
  stateCode: string;
  stateName: string;
  listingsCount: number;
  status: string;
  createdAt: string;
}

// 28 States + 8 Union Territories of India (Fixed List: 36 Total)
export const INDIAN_STATES: IndianState[] = [
  // 28 States
  { code: "AP", name: "Andhra Pradesh", type: "State", capital: "Amaravati" },
  { code: "AR", name: "Arunachal Pradesh", type: "State", capital: "Itanagar" },
  { code: "AS", name: "Assam", type: "State", capital: "Dispur" },
  { code: "BR", name: "Bihar", type: "State", capital: "Patna" },
  { code: "CG", name: "Chhattisgarh", type: "State", capital: "Raipur" },
  { code: "GA", name: "Goa", type: "State", capital: "Panaji" },
  { code: "GJ", name: "Gujarat", type: "State", capital: "Gandhinagar" },
  { code: "HR", name: "Haryana", type: "State", capital: "Chandigarh" },
  { code: "HP", name: "Himachal Pradesh", type: "State", capital: "Shimla" },
  { code: "JH", name: "Jharkhand", type: "State", capital: "Ranchi" },
  { code: "KA", name: "Karnataka", type: "State", capital: "Bengaluru" },
  { code: "KL", name: "Kerala", type: "State", capital: "Thiruvananthapuram" },
  { code: "MP", name: "Madhya Pradesh", type: "State", capital: "Bhopal" },
  { code: "MH", name: "Maharashtra", type: "State", capital: "Mumbai" },
  { code: "MN", name: "Manipur", type: "State", capital: "Imphal" },
  { code: "ML", name: "Meghalaya", type: "State", capital: "Shillong" },
  { code: "MZ", name: "Mizoram", type: "State", capital: "Aizawl" },
  { code: "NL", name: "Nagaland", type: "State", capital: "Kohima" },
  { code: "OD", name: "Odisha", type: "State", capital: "Bhubaneswar" },
  { code: "PB", name: "Punjab", type: "State", capital: "Chandigarh" },
  { code: "RJ", name: "Rajasthan", type: "State", capital: "Jaipur" },
  { code: "SK", name: "Sikkim", type: "State", capital: "Gangtok" },
  { code: "TN", name: "Tamil Nadu", type: "State", capital: "Chennai" },
  { code: "TS", name: "Telangana", type: "State", capital: "Hyderabad" },
  { code: "TR", name: "Tripura", type: "State", capital: "Agartala" },
  { code: "UP", name: "Uttar Pradesh", type: "State", capital: "Lucknow" },
  { code: "UK", name: "Uttarakhand", type: "State", capital: "Dehradun" },
  { code: "WB", name: "West Bengal", type: "State", capital: "Kolkata" },

  // 8 Union Territories
  { code: "AN", name: "Andaman and Nicobar Islands", type: "Union Territory", capital: "Port Blair" },
  { code: "CH", name: "Chandigarh", type: "Union Territory", capital: "Chandigarh" },
  { code: "DH", name: "Dadra and Nagar Haveli and Daman and Diu", type: "Union Territory", capital: "Daman" },
  { code: "DL", name: "Delhi", type: "Union Territory", capital: "New Delhi" },
  { code: "JK", name: "Jammu and Kashmir", type: "Union Territory", capital: "Srinagar" },
  { code: "LA", name: "Ladakh", type: "Union Territory", capital: "Leh" },
  { code: "LD", name: "Lakshadweep", type: "Union Territory", capital: "Kavaratti" },
  { code: "PY", name: "Puducherry", type: "Union Territory", capital: "Puducherry" },
];

// Dynamic Initial Cities
export const mockCities: LocationCityItem[] = [
  // Gujarat Cities
  {
    id: "city-1",
    name: "Ahmedabad",
    slug: "ahmedabad",
    stateCode: "GJ",
    stateName: "Gujarat",
    listingsCount: 1420,
    status: "Active",
    createdAt: "12 Oct 2026",
  },
  {
    id: "city-2",
    name: "Surat",
    slug: "surat",
    stateCode: "GJ",
    stateName: "Gujarat",
    listingsCount: 980,
    status: "Active",
    createdAt: "15 Oct 2026",
  },
  {
    id: "city-3",
    name: "Vadodara",
    slug: "vadodara",
    stateCode: "GJ",
    stateName: "Gujarat",
    listingsCount: 640,
    status: "Active",
    createdAt: "18 Oct 2026",
  },
  {
    id: "city-4",
    name: "Rajkot",
    slug: "rajkot",
    stateCode: "GJ",
    stateName: "Gujarat",
    listingsCount: 430,
    status: "Active",
    createdAt: "20 Oct 2026",
  },
  {
    id: "city-5",
    name: "Gandhinagar",
    slug: "gandhinagar",
    stateCode: "GJ",
    stateName: "Gujarat",
    listingsCount: 310,
    status: "Active",
    createdAt: "22 Oct 2026",
  },
  {
    id: "city-6",
    name: "Bhavnagar",
    slug: "bhavnagar",
    stateCode: "GJ",
    stateName: "Gujarat",
    listingsCount: 190,
    status: "Active",
    createdAt: "24 Oct 2026",
  },

  // Maharashtra Cities
  {
    id: "city-7",
    name: "Mumbai",
    slug: "mumbai",
    stateCode: "MH",
    stateName: "Maharashtra",
    listingsCount: 4850,
    status: "Active",
    createdAt: "10 Oct 2026",
  },
  {
    id: "city-8",
    name: "Pune",
    slug: "pune",
    stateCode: "MH",
    stateName: "Maharashtra",
    listingsCount: 2150,
    status: "Active",
    createdAt: "14 Oct 2026",
  },
  {
    id: "city-9",
    name: "Nagpur",
    slug: "nagpur",
    stateCode: "MH",
    stateName: "Maharashtra",
    listingsCount: 520,
    status: "Active",
    createdAt: "19 Oct 2026",
  },

  // Delhi (NCR)
  {
    id: "city-10",
    name: "New Delhi",
    slug: "new-delhi",
    stateCode: "DL",
    stateName: "Delhi",
    listingsCount: 5200,
    status: "Active",
    createdAt: "08 Oct 2026",
  },

  // Karnataka Cities
  {
    id: "city-11",
    name: "Bengaluru",
    slug: "bengaluru",
    stateCode: "KA",
    stateName: "Karnataka",
    listingsCount: 4100,
    status: "Active",
    createdAt: "09 Oct 2026",
  },

  // Telangana
  {
    id: "city-12",
    name: "Hyderabad",
    slug: "hyderabad",
    stateCode: "TS",
    stateName: "Telangana",
    listingsCount: 3600,
    status: "Active",
    createdAt: "11 Oct 2026",
  },

  // Rajasthan
  {
    id: "city-13",
    name: "Jaipur",
    slug: "jaipur",
    stateCode: "RJ",
    stateName: "Rajasthan",
    listingsCount: 1250,
    status: "Active",
    createdAt: "16 Oct 2026",
  },
];

export function getCitiesByState(stateNameOrCode: string): string[] {
  if (!stateNameOrCode) return [];

  const matchedState = INDIAN_STATES.find(
    (s) =>
      s.name.toLowerCase() === stateNameOrCode.toLowerCase() ||
      s.code.toLowerCase() === stateNameOrCode.toLowerCase()
  );

  const matchedCities = mockCities
    .filter(
      (c) =>
        c.stateName.toLowerCase() === stateNameOrCode.toLowerCase() ||
        (matchedState && c.stateCode.toLowerCase() === matchedState.code.toLowerCase())
    )
    .map((c) => c.name);

  if (matchedCities.length > 0) {
    return matchedCities;
  }

  // Graceful fallback: If no city has been added to mockCities yet for this state, use capital
  if (matchedState?.capital) {
    return [matchedState.capital];
  }

  return [];
}

