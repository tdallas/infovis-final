interface DateString {
  date: string;
}

const VACCINE_RECEPTIONS_URL = process.env.VACCINE_RECEPTIONS_URL;

// date should be 2021-06-23
const getFileName = (date: DateString) =>
  `${date}-actas-de-recepcion-vacunas.xlsx`;
