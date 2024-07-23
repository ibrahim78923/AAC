export interface InvoiceI {
  open: boolean;
  onClose: () => void;
}

export interface OnSubmitFiltersValueI {
  status: string;
  productId: string;
  planId: string;
  billingDate?: string;
  dueDate?: string;
}
