import { useQuery } from "@tanstack/react-query";
import { locationService } from "../location.service";
import { LOCATION_QUERY_KEYS } from "../location-query-keys";

export const useCityBySlug = (slug: string) => {
  return useQuery({
    queryKey: LOCATION_QUERY_KEYS.cityDetail(slug),
    queryFn: () => locationService.getCityBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
};
