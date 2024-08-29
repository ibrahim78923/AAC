export interface FilterReportDataDefaultValuesI {
  owner: { [key: string]: any };
  accessType: { [key: string]: any };
  startDate: Date | null;
  endDate: Date | null;
}

export interface FilterReportFormFieldsI {
  owner: { [key: string]: any };
  accessType: { [key: string]: any };
  createdDate: {
    startDate: Date | null;
    endDate: Date | null;
    key: 'selection';
  };
}
