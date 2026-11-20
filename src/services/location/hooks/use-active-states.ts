import { useQuery } from "@tanstack/react-query";
import { locationService } from "../location.service";
import { LOCATION_QUERY_KEYS } from "../location-query-keys";

export const useActiveStates = () => {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.activeStates(),
    queryFn: () => locationService.getActiveStates(),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
};
