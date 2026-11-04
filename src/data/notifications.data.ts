export type NotificationType = "listing" | "inquiry" | "payment" | "broadcast";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: NotificationType;
  link?: string;
  actionLabel?: string;
}

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Customer Inquiry Received",
    message: "Priya Sengupta sent an inquiry for Bridal Makeup & Pre-Bridal Package at Urban Style Hair & Beauty Salon.",
    createdAt: "10 mins ago",
    read: false,
    type: "inquiry",
    link: "/dashboard/inquiries",
    actionLabel: "View Inquiry",
  },
  {
    id: "notif-2",
    title: "Business Listing Approved",
    message: "Royal Palace Heritage Hotel & Resort has been verified and is now live on the public directory.",
    createdAt: "2 hours ago",
    read: false,
    type: "listing",
    link: "/dashboard/my-listings",
    actionLabel: "View Listing",
  },
  {
    id: "notif-3",
    title: "Subscription / Plan Expiry Reminder",
    message: "Your ₹199 Featured Listing package for Urban Style Salon will expire in 3 days. Renew now to retain top search visibility.",
    createdAt: "Yesterday",
    read: true,
    type: "payment",
    link: "/advertise",
    actionLabel: "Renew Plan",
  },
  {
    id: "notif-4",
    title: "Festival Growth Campaign Broadcast",
    message: "Special festive promotion is live! Upgrade your verified listings to Featured Pro to capture 5x more customer leads.",
    createdAt: "3 days ago",
    read: true,
    type: "broadcast",
    link: "/advertise",
    actionLabel: "Explore Plans",
  },
  {
    id: "notif-5",
    title: "Listing Profile Review Reminder",
    message: "Apex Multi-Speciality Clinic & Diagnostic Center profile has reached 2,150 views. Update your operating hours.",
    createdAt: "5 days ago",
    read: true,
    type: "listing",
    link: "/dashboard/my-listings",
    actionLabel: "Update Listing",
  },
  {
    id: "notif-6",
    title: "Customer Inquiry Follow-up",
    message: "Rajesh Kulkarni sent an inquiry for Royal Suite Weekend Package. Check inquiry status.",
    createdAt: "1 week ago",
    read: true,
    type: "inquiry",
    link: "/dashboard/inquiries",
    actionLabel: "View Inquiry",
  },
];

let storedNotifications: NotificationItem[] = [...initialNotifications];

export function getStoredNotifications(): NotificationItem[] {
  return [...storedNotifications];
}

export function markNotificationAsRead(id: string): NotificationItem[] {
  storedNotifications = storedNotifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  return [...storedNotifications];
}

export function toggleNotificationRead(id: string): NotificationItem[] {
  storedNotifications = storedNotifications.map((n) =>
    n.id === id ? { ...n, read: !n.read } : n
  );
  return [...storedNotifications];
}

export function markAllNotificationsAsRead(): NotificationItem[] {
  storedNotifications = storedNotifications.map((n) => ({ ...n, read: true }));
  return [...storedNotifications];
}

export function deleteNotification(id: string): NotificationItem[] {
  storedNotifications = storedNotifications.filter((n) => n.id !== id);
  return [...storedNotifications];
}

export function clearAllNotifications(): NotificationItem[] {
  storedNotifications = [];
  return [];
}
