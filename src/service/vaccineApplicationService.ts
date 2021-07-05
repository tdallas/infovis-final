interface DoseDistributionByAgeGroup {}

interface VaccineTypeDistributionByProvince {}

interface ApplicationConditionsByAgeGroup {}

const getDoseDistributionByAgeGroup = (): Array<DoseDistributionByAgeGroup> => {
  return [];
};

const getVaccineTypeDistributionByProvince =
  (): Array<VaccineTypeDistributionByProvince> => {
    return [];
  };

// if none received, it means Argentina
const getTotalVaccinesApplicated = (province: String | undefined): Number => {
  return 0;
};

const getApplicationConditionsByAgeGroup = (
  province: String | undefined
): Array<ApplicationConditionsByAgeGroup> => {
  return [];
};

export {
  getDoseDistributionByAgeGroup,
  getVaccineTypeDistributionByProvince,
  getTotalVaccinesApplicated,
  getApplicationConditionsByAgeGroup,
};
