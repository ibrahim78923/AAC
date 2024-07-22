export interface EditInvoiceI {
  subTotal: string;
  plans?: {
    planPrice?: number;
    products?: Array<{ name: string }>;
    additionalPerUserPrice?: number;
    additionalStoragePrice?: number;
  };
  details?: {
    sumAdditionalUsersPrices?: number;
    sumAdditionalStoragePrices?: number;
    planDiscount?: number;
    additionalUsers?: number;
    additionalStorage?: number;
    plantypes?: string;
    billingCycle?: string;
    subTotal?: number;
  };
  invoiceDiscount?: number;
  tax?: number;
  netAmount?: number;
}

export interface InvoiceListPropsI {
  setOpenViewInvoice: (open: boolean) => void;
  EditInvoice: EditInvoiceI | null;
  discountValue?: number;
}

export interface ListProductI {
  name: string;
}
