export interface EmailReportDataDefaultValuesI {
  recipients?: string[];
  subject?: string;
  html?: string;
  sender: string;
  attachments?: any;
}

export interface EmailReportFormFieldsI {
  recipients: string[] | any;
  subject: string;
  html: string;
  sender: string;
  attachments: any;
}
