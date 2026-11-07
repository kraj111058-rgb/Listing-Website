export interface ListingPlanItem {
  id: string; // matches listing id e.g. "lst-1"
  listingName: string;
  category: string;
  city: string;
  image: string;
  planId: "free" | "featured" | "featured-pro";
  planName: "Free Listing" | "Featured Listing" | "Featured Pro";
  price: string;
  period: string;
  status: "Active" | "Expiring Soon" | "Expired";
  startDate: string;
  expiryDate: string;
  daysRemaining: number | null; // null for free (lifetime)
}

export const initialListingPlans: ListingPlanItem[] = [
  {
    id: "lst-1",
    listingName: "Royal Palace Heritage Hotel & Resort",
    category: "Hotels & Travel",
    city: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60",
    planId: "featured",
    planName: "Featured Listing",
    price: "₹199",
    period: "/ 3 months",
    status: "Active",
    startDate: "15 Sep 2026",
    expiryDate: "15 Dec 2026",
    daysRemaining: 39,
  },
  {
    id: "lst-2",
    listingName: "Apex Multi-Speciality Clinic & Diagnostic Center",
    category: "Doctors & Health",
    city: "Ahmedabad, Gujarat",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&auto=format&fit=crop&q=60",
    planId: "free",
    planName: "Free Listing",
    price: "₹0",
    period: "/ forever",
    status: "Active",
    startDate: "05 Feb 2026",
    expiryDate: "Lifetime",
    daysRemaining: null,
  },
  {
    id: "lst-3",
    listingName: "Saffron Spices Fine Dining Indian Restaurant",
    category: "Restaurants",
    city: "Surat, Gujarat",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    planId: "free",
    planName: "Free Listing",
    price: "₹0",
    period: "/ forever",
    status: "Active",
    startDate: "18 Sep 2026",
    expiryDate: "Lifetime",
    daysRemaining: null,
  },
  {
    id: "lst-4",
    listingName: "Urban Style Fashion Boutique & Tailors",
    category: "Shopping & Fashion",
    city: "Vadodara, Gujarat",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60",
    planId: "featured-pro",
    planName: "Featured Pro",
    price: "₹499",
    period: "/ 3 months",
    status: "Active",
    startDate: "20 Sep 2026",
    expiryDate: "20 Dec 2026",
    daysRemaining: 44,
  },
  {
    id: "lst-5",
    listingName: "Elite Fitness Club & Wellness Gym",
    category: "Fitness & Sports",
    city: "Ahmedabad, Gujarat",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60",
    planId: "featured",
    planName: "Featured Listing",
    price: "₹199",
    period: "/ 3 months",
    status: "Expired",
    startDate: "10 Jul 2026",
    expiryDate: "10 Oct 2026",
    daysRemaining: 0,
  },
  {
    id: "lst-6",
    listingName: "Green Leaf Organic Cafe & Bakery",
    category: "Food & Dining",
    city: "Gandhinagar, Gujarat",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60",
    planId: "free",
    planName: "Free Listing",
    price: "₹0",
    period: "/ forever",
    status: "Active",
    startDate: "12 Mar 2026",
    expiryDate: "Lifetime",
    daysRemaining: null,
  },
];
