export interface AutocompleteOptionsI {
  _id: string;
  label: string;
}

export interface AutocompleteAsyncOptionsI {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  user?: {
    firstName?: string;
    lastName?: string;
  };
  categoryName?: string;
  ticketIdNumber?: string;
  subject?: string;
  itemName?: string;
  displayName?: string;
  title?: string;
}

export interface ReactHookFormFieldsI {
  id: string | number;
  componentProps?: {
    name?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    [key: string]: any;
  };
  component: any;
  md?: number;
  gridLength?: number;
  [key: string]: any;
}
