export interface LastUpdateResultSql {
  id: Number;
  last_update: Date;
}

export class LastUpdate {
  public table_name: String;
  public last_update: Date;

  constructor(last_update: LastUpdateResultSql) {
    this.table_name =
      last_update.id === 1 ? 'vaccine_applications' : 'vaccine_receptions';
    this.last_update = last_update.last_update;
  }
}
