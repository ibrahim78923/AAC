import { Theme } from '@mui/material';

export interface AddTeamsDrawerPropsI {
  isToggle: boolean;
  type: string;
}
export interface ColumnsPropsI {
  setIsTeamDrawer: (isTeamDrawer: boolean) => void;
  setIsOpenDelete: (isOpenDelete: boolean) => void;
  theme: Theme;
  setTeamId: (teamId: string) => void;
  setIsAddTeam: (isAddTeam: any) => void;
}

export interface ViewTeamsPropsI {
  isTeamDrawer: boolean;
  setIsTeamDrawer: (isTeamDrawer: boolean) => void;
  teamId: string;
}

export interface MemberDetailsPropsI {
  img: string;
  name: string;
  email: string;
  designation: string;
}

export interface IsAddTeamI {
  isToggle: boolean;
  type: string;
}
export interface CreateTeamsPropsI {
  isAddTeam: IsAddTeamI;
  setIsAddTeam: (isAddTeam: IsAddTeamI) => void;
  teamId: string;
}
