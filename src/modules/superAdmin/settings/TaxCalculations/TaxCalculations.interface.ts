export interface AddTaxFormValuesI {
  name: string;
  percentage: string;
  description?: string;
  applyOn: any[];
}

export interface FilterValuesI {
  status: string;
  createdDate: (Date | null)[];
  applyOn: string;
}
