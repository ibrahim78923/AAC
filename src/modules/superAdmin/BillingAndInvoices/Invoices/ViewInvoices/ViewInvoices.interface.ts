export interface ViewInvoicesI {
  open: boolean;
  onClose: () => void;
  isGetRowValues: any;
}

export interface PlanCellInfoI {
  getValue: () => any;
  row: {
    original: InvoiceDataI;
  };
}

export interface PlanDetails {
  planPrice: number;
  additionalUsers: number;
  additionalStorage: number;
  planDiscount: number;
}

export interface InvoicePlanI {
  products: string[];
  additionalPerUserPrice: number;
  additionalStoragePrice: number;
}

export interface InvoiceDataI {
  id: string | number;
  products: string;
  details: {
    plans: PlanDetails;
    additionalUsers: number;
    additionalStorage: number;
    planDiscount: number;
  };
  plantypes: string;
  subTotal: number;
  plans: InvoicePlanI;
}
