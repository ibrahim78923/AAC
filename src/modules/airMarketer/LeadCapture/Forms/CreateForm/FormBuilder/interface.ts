export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'button'
  | 'file'
  | 'space'
  | 'divider';

export interface Field {
  _id?: string;
  type?: FormFieldType;
  name?: string;
  label?: string;
  value?: string;
  className?: string;
  subtype?: string;
  link?: string;
  values?: Array<{ label: string; value: string; selected: boolean }>;
  space?: number;
  placeholder?: string;
  required?: boolean;
  dividerWidth?: number;
  dividerColor?: string;
  buttonType?: 'submit' | 'reset' | 'button' | undefined;
  buttonText?: string | undefined;
}
