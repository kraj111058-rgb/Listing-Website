import { SubscriptionPlanStatus } from "@/enums";
import { supabase, SUPABASE_CONSTANTS } from "@/lib/supabase";
import type { SubscriptionPlanData, SubscriptionPlanResponse } from "./subscription-plan.types";

export const subscriptionPlanService = {
  // Fetch active subscription plans from Supabase (Sorted by price ascending)
  getActivePlans: async (): Promise<SubscriptionPlanResponse> => {
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.SUBSCRIPTION_PLANS)
      .select("*")
      .eq("status", SubscriptionPlanStatus.ACTIVE)
      .order("price", { ascending: true });

    if (error) throw new Error(error.message);

    return (data as SubscriptionPlanData[]) || [];
  },
};
