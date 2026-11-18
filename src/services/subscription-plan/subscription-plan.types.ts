import type { SubscriptionPlanStatus } from "@/enums";

export interface SubscriptionPlanData {
  id: string;
  name: string;
  tag: string;
  icon: string;
  price: number;
  period: string;
  duration_months: number;
  popular: boolean;
  headline: string;
  description: string;
  listings_limit: number;
  services_limit: number;
  included_features: string[];
  status: SubscriptionPlanStatus;
  created_at: string;
  updated_at: string;
}

export type SubscriptionPlanResponse= SubscriptionPlanData[];