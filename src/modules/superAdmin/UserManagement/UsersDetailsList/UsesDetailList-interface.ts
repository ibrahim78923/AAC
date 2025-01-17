import { Dispatch, SetStateAction } from 'react';

export interface AddAccountDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  organizationBasesProducts: any;
  organizationId: string;
  userId: string;
}

export interface AddCompanyDetailsProps {
  isOpenDrawer: boolean;
  onClose: (value: boolean) => void;
  organizationId: string;
  setISOpenCompanyDrawer: (value: boolean) => void;
  organizationBasesProducts: Array<{
    _id: string;
    name: string;
    logo?: { url: string };
  }>;
}

export interface UploadLogoProps {
  companyImg: string;
  setCompanyImg: (img: File) => void;
}

export interface UseUploadLogoProps {
  companyImg: string;
  setCompanyImg: (img: File) => void;
}

export interface FilterProps {
  isOpenDrawer: boolean;
  setIsOpenDrawer: (isOpen: boolean) => void;
  employeeFilter: any;
  setEmployeeFilter: (filter: any) => void;
  organizationId: string;
}

export interface UserProfileParams {
  isToggled?: boolean;
  userDetails?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: {
      composite?: string;
      flatNumber?: string;
      city?: string;
      country?: string;
      buildingName?: string;
      buildingNumber?: string;
      streetName?: string;
    };
    postCode?: string;
    phoneNumber?: string;
    jobTitle?: string;
    facebookUrl?: string;
    linkedInUrl?: string;
  };
  setTabVal?: any;
}

export interface CompanyAccountsProps {
  organizationId: string;
  employeeDataById: string;
  searchAccount?: string;
}
