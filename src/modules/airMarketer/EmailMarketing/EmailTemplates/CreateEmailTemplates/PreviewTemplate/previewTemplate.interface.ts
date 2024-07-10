import { Field } from '../FormBuilder/interface';

export interface PreviewDataItemI {
  _id?: string;
  type?: string;
  name?: string;
  label?: string;
  required?: boolean;
  value?: string; // Optional property for 'textarea'
  space?: number; // Optional property for 'space'
  dividerWidth?: number; // Optional property for 'divider'
  dividerColor?: string; // Optional property for 'divider'
  buttonType?: string; // Optional property for 'button'
  buttonText?: string; // Optional property for 'button'
}

export interface PreviewTemplatePropsI {
  setOpenModal: (open: boolean) => void;
  fields: Field[];
}
