import { ReactNode } from 'react';

export interface IProfileDetail {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  status?: string;
  products?: Array<{
    _id?: string;
    name?: string;
    description?: string;
    logo?: {
      id?: string;
      url?: string;
      size?: number;
      mimetype?: string;
    };
    status?: string;
    createdBy?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    updatedBy?: string;
    isChild?: boolean;
  }>;
  organization?: {
    _id?: string;
    crn?: string;
    name?: string;
  };
  avatar?: {
    id?: string;
    url?: string;
    size?: number;
    mimetype?: string;
  };
  facebookUrl?: string;
  jobTitle?: string;
  language?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
  mobileNumber?: string;
  timezone?: string | null;
  activeProducts?: Array<{
    _id?: string;
    name?: string;
    logo?: {
      id?: string;
      url?: string;
      size?: number;
      mimetype?: string;
    };
  }>;
}

export interface IAuth {
  user?: {
    _id?: string | any;
  };
}

export interface IPropsAccountDetails {
  isLoading?: boolean;
  profileMethods?: any;
  handleSubmitProfile?: (() => void) | any;
  handleCancel?: (() => void) | any;
  profileDetail?: IProfileDetail;
}

export interface IComponentProps {
  name?: string;
  label?: string;
  size?: 'small' | 'medium';
  required?: boolean;
  type?: 'text' | 'password';
  disabled?: boolean;
  options?: any[];
  getOptionLabel?: (option: any) => string;
  InputProps?: {
    endAdornment?: ReactNode;
  };
}
