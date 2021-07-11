export interface ApplicationsByAgeGroupRequest {
  query: WithLocationAndAgeGroup;
}

export interface ByLocationRequest {
  query: WithLocation;
}

interface WithLocationAndAgeGroup {
  province: string | undefined;
  department: string | undefined;
  ageGroup: string | undefined;
}

interface WithLocation {
  province: string | undefined;
  department: string | undefined;
}
