import { useQuery } from "@tanstack/react-query";
import { subscriptionPlanService } from "../subscription-plan.service";
import { SUBSCRIPTION_PLAN_QUERY_KEYS } from "../subscription-plan-query-keys";

export const useActiveSubscriptionPlans = () => {
  return useQuery({
    queryKey: SUBSCRIPTION_PLAN_QUERY_KEYS.active(),
    queryFn: () => subscriptionPlanService.getActivePlans(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
