export interface EditInvoiceTypeI {
  subTotal?: number;
  dueDate?: string;
  invoiceDiscount?: number;
  _id?: string;
  plans?: {
    planPrice: number;
  };
  details?: {
    sumAdditionalUsersPrices: number;
    sumAdditionalStoragePrices: number;
    planDiscount: number;
  };
  tax?: number;
  netAmount?: number;
  organizations?: {
    address?: {
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      phoneNo?: string;
      email?: string;
    };
    name?: string;
  };
  usersOrg?: {
    firstName?: string;
    lastName?: string;
  };
  invoiceNo?: string;
  billingDate?: string;
  vat?: number;
}
