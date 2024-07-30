export interface UserManagementProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface DrawerI {
  isToggle: boolean;
  type: string;
  recordId: string[] | any;
}
export interface UserTableProps {
  setIsAddUserDrawer: (value: DrawerI) => void;
  setCheckedUser: (value: string[] | any) => void;
  isAddUserDrawer: DrawerI;
  checkedUser: string[];
}

export interface AddUsersI {
  isAddUserDrawer: DrawerI;
  setIsAddUserDrawer: (value: DrawerI) => void;
  checkedUser: string[];
}

interface addTeamDrawerI {
  isToggle: boolean;
  type: string;
}

export interface TeamsProps {
  isAddTeam: addTeamDrawerI;
  setIsAddTeam: (value: addTeamDrawerI) => void;
  setTeamId: (id: string) => void;
  teamId: string;
  setIsTeamDrawer: (value: boolean) => void;
  isTeamDrawer: boolean;
  setIsOpenDelete: (value: boolean) => void;
}
