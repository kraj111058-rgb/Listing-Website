export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  memberSince: string;
  activeListingsCount: number;
  totalInquiriesCount: number;
}

export const initialUserProfile: UserProfile = {
  name: "Rahul Sharma",
  email: "rahul@business.in",
  phone: "9876543210",
  role: "Business Owner",
  avatar: "",
  memberSince: "Jan 2026",
  activeListingsCount: 2,
  totalInquiriesCount: 48,
};
