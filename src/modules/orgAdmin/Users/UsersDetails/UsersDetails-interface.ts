export interface UsersDetailsProps {
  employeeDataById: string;
  searchAccount: string;
  setSearchAccount: (value: string) => void;
}

export interface AddAccountProps {
  isOpen: boolean;
  employeeDataById: string;
  setIsOpenAddAccountDrawer: (isOpen: boolean) => void;
}

export interface UserDetailsProfileProps {
  profileData: any;
  setTabVal: (tab: any) => void;
}
