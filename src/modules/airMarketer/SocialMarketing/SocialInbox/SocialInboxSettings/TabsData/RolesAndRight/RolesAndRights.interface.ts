export interface ColumnsPropsI {
  checkedRows: string;
  setCheckedRows: (val?: string) => void;
}

export interface DrawerI {
  isToggle: boolean;
  type: string;
  id: string;
}
export interface AddRoleDrawerI {
  isDrawerOpen: DrawerI;
  onClose: () => void;
  setCheckedRows: (val: string) => void;
}
