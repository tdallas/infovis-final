export class VaccineReception {
  public id: number;
  public reception_date: Date;
  public dosis_received: number;

  constructor(id: number, reception_date: Date, dosis_received: number) {
    this.id = id;
    this.reception_date = reception_date;
    this.dosis_received = dosis_received;
  }
}
