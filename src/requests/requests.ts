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
  department: string | undefined;
  ageGroup: string | undefined;
}

interface WithLocationAndDateInterval {
  province: string | undefined;
  department: string | undefined;
  from_: string | undefined;
}

interface WithLocation {
  province: string | undefined;
  department: string | undefined;
}
