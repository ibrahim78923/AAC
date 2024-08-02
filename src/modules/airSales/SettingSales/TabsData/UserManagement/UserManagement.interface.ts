export interface UserManagementProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IsAddUserDrawer {
  isToggle: boolean;
  type: string;
  recordId: string[];
}

export interface AddUsersProps {
  isAddUserDrawer: IsAddUserDrawer;
  setIsAddUserDrawer: (val: IsAddUserDrawer) => void;
}
