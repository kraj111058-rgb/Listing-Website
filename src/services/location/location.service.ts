import { LocationStatus } from "@/enums";
import { supabase, SUPABASE_CONSTANTS } from "@/lib/supabase";
import type { CityData, CityResponse, StateData, StateResponse } from "./location.types";

export const locationService = {
  // 1. Get all active states (ordered by name)
  getActiveStates: async (): Promise<StateResponse> => {
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.STATES)
      .select("*")
      .eq("status", LocationStatus.ACTIVE)
      .order("name", { ascending: true });

    if (error) throw new Error(error.message);
    return (data as StateData[]) || [];
  },

  // 2. Get all active cities with state relation
  getActiveCities: async (): Promise<CityResponse> => {
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.CITIES)
      .select("*, state:states!cities_state_id_fkey(*)")
      .eq("status", LocationStatus.ACTIVE)
      .order("name", { ascending: true });

    if (error) throw new Error(error.message);
    return (data as CityData[]) || [];
  },

  // 3. Get active cities by state code (e.g. "GJ", "MH")
  getCitiesByStateCode: async (stateCode: string): Promise<CityResponse> => {
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.CITIES)
      .select("*, state:states!cities_state_id_fkey(*)")
      .eq("state_code", stateCode)
      .eq("status", LocationStatus.ACTIVE)
      .order("name", { ascending: true });

    if (error) throw new Error(error.message);
    return (data as CityData[]) || [];
  },

  // 4. Get city by slug (e.g. "rajkot", "ahmedabad")
  getCityBySlug: async (slug: string): Promise<CityData> => {
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.CITIES)
      .select("*, state:states!cities_state_id_fkey(*)")
      .eq("slug", slug)
      .eq("status", LocationStatus.ACTIVE)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as CityData;
  },
};
