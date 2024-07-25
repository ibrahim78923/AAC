export interface CreatedByI {
  _id: string;
  name: string;
}

export interface FaqCategoryI {
  value: string;
  label: string;
}

export interface FaqI {
  _id: string;
  faqQuestion: string;
  faqCategory: FaqCategoryI;
  faqAnswer: string;
  createdBy: CreatedByI;
  createdAt: string;
}

export interface SelectOptionI {
  value: string;
  label: string;
}

export interface ColumnPropsI {
  accessorFn: (row: FaqI) => any;
  id: string;
  cell: (info: any) => JSX.Element | string;
  header: string | ((info: any) => JSX.Element);
  isSortable: boolean;
}

export interface FilterValuesI {
  faqCategory: FaqCategoryI;
  createdBy: CreatedByI;
  createdAt: string;
}

export interface FormDataI {
  faqCategory: any | null;
  faqQuestion: string;
  faqAnswer: string;
}
