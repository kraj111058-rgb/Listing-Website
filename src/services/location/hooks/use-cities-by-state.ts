import { useQuery } from "@tanstack/react-query";
import { locationService } from "../location.service";
import { LOCATION_QUERY_KEYS } from "../location-query-keys";

export const useCitiesByState = (stateCode: string) => {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.citiesByState(stateCode),
    queryFn: () => locationService.getCitiesByStateCode(stateCode),
    enabled: Boolean(stateCode),
    staleTime: 1000 * 60 * 5,
  });
};
