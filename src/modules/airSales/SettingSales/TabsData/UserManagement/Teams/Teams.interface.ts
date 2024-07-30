import { Theme } from '@mui/material';

export interface AddTeamsDrawerPropsI {
  isToggle: boolean;
  type: string;
}

export interface TeamsPropsI {
  isAddTeam: AddTeamsDrawerPropsI;
  setIsAddTeam: (isAddTeam: AddTeamsDrawerPropsI) => void;
  setTeamId: (teamId: string) => void;
  teamId: string;
  setIsTeamDrawer: (isTeamDrawer: boolean) => void;
  isTeamDrawer: boolean;
  setIsOpenDelete: (isOpenDelete: boolean) => void;
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
  teamData: any;
  teamByIdLoading: boolean;
}

export interface MemberDetailsPropsI {
  img: string;
  name: string;
  email: string;
  designation: string;
}
