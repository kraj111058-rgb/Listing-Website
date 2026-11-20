import { useQuery } from "@tanstack/react-query";
import { locationService } from "../location.service";
import { LOCATION_QUERY_KEYS } from "../location-query-keys";

export const useActiveCities = () => {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.activeCities(),
    queryFn: () => locationService.getActiveCities(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
