// src/types.ts
export type FormElementType = 'text' | 'textarea';

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  value: string;
}
