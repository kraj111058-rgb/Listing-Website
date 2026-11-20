import type { LocationStatus, StateType } from "@/enums";

export interface StateData {
  id: string;
  code: string;
  name: string;
  type: StateType;
  capital?: string | null;
  status: LocationStatus;
  created_at: string;
  updated_at: string;
}

export interface CityData {
  id: string;
  name: string;
  slug: string;
  state_id: string;
  state_code: string;
  status: LocationStatus;
  created_at: string;
  updated_at: string;
  state?: StateData;
  listings_count?: number;
}

export type StateResponse = StateData[];
export type CityResponse = CityData[];
