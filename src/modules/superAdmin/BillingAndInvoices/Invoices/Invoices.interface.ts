export interface InvoiceI {
  open: boolean;
  onClose: () => void;
}

export interface Option {
  value: string;
  label: string;
}

export interface ComponentProps {
  select?: any;
  [key: string]: any;
}

export interface FilterInvoiceFiltersI {
  md?: number;
  component: React.ElementType;
  componentProps: ComponentProps;
  options?: Option[];
}
