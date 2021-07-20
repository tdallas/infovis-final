export interface ApplicationsByAgeGroupRequest {
  query: WithLocationAndAgeGroup;
}

export interface ByLocationRequest {
  query: WithLocation;
}

export interface DailyApplicationsRequest {
  query: WithLocationAndDateInterval;
}

interface WithLocationAndAgeGroup {
  province: string | undefined;
  city: string | undefined;
  age_group: string | undefined;
}

interface WithLocationAndDateInterval {
  province: string | undefined;
  city: string | undefined;
  from_date: string | undefined;
  to_date: string | undefined;
}

interface WithLocation {
  province: string | undefined;
  city: string | undefined;
}
