import { Dispatch, SetStateAction } from 'react';

export interface UserListI {
  id: number;
  name: string;
  email: string;
  team: string;
  role: string;
  status: boolean;
  icon: any;
}

export interface UserIsPortalOpenI {
  isOpen?: boolean;
  isView?: boolean;
  isUpsert?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
  isAdd?: boolean;
}
export interface UserPortalComponentPropsI {
  isPortalOpen: UserIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<UserIsPortalOpenI>>;
  setSelectedUserList: Dispatch<SetStateAction<any>>;
  selectedUserList: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalRecords: number;
  userId: string;
  getOperationUsersList: (currentPage: number) => Promise<void>;
}

export interface UserTableRowI {
  _id?: string;
  user?: {
    email?: string;
  };
  team?: {
    name?: string;
  };
  role?: {
    name?: string;
  };
  status?: string;
}
