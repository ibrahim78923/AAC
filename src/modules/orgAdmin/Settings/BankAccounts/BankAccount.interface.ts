interface DrawerInterface {
  isToggle: boolean;
  type: string;
  recId: string;
}
export interface ActionDropDownI {
  setIsOpenAddAccountDrawer: (value: DrawerInterface) => void;
  deleteReceiverBankAccount: (data: string[] | any) => void;
  setCheckedRows: (value: string[]) => void;
  deleteAccountLoading: boolean;
  checkedRows: string[];
}
