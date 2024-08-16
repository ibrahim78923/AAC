import { ElementType, ReactNode } from 'react';

interface IComponentProps {
  name?: string;
  label?: string;
  InputProps?: {
    endAdornment?: ReactNode;
  };
}

export interface ISettingsDataItem {
  id?: number;
  componentProps?: IComponentProps;
  md?: number;
  component: ElementType;
}

export interface ISettingsDefaultValuesProps {
  domain?: string;
  encryptedValue?: string;
  apiKeyData?: string;
}

export interface ISettingsDefaultValues {
  portalName?: string;
  portalURL?: string;
  domain?: string;
  encryptedValue?: string;
  dateFormat?: string;
  timeFormat?: string;
  primaryLanguage?: string;
  apiKey?: string;
}

interface IAuthProductAccount {
  company?: ICompanyAccount | any;
}

interface ICompanyAccount {
  _id?: string | any;
}

export interface IAuth {
  product?: { accounts?: Array<IAuthProductAccount> };
}
