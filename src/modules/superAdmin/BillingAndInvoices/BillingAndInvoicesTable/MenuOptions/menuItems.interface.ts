import { Dispatch, SetStateAction } from 'react';

export interface MenuItemsPropsI {
  isViewDetailOpen?: boolean;
  setIsOpenDrawer: (isOpen: boolean) => void;
  setIsShowViewBillingDetails: (isShow: boolean) => void;
  isChecked: boolean;
  setIsEditModal: (isEdit: boolean) => void;
  setIsUnassignPlan: (isUnassign: boolean) => void;
  planStatus: string;
  setIsViewDeailOpen: Dispatch<SetStateAction<boolean>>;
  setisShowGenerateInvoice?: Dispatch<SetStateAction<boolean>>;
}
