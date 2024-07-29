export interface AddTeamsDrawerPropsI {
  isToggle: boolean;
  type: string;
}

export interface TeamsPropsI {
  isAddTeam: AddTeamsDrawerPropsI;
  setIsAddTeam: (isAddTeam: AddTeamsDrawerPropsI) => void;
  setTeamId: (teamId: number) => void;
  teamId: number;
  setIsTeamDrawer: (isTeamDrawer: boolean) => void;
  isTeamDrawer: boolean;
  setIsOpenDelete: (isOpenDelete: boolean) => void;
}

export interface ColumnsPropsI {
  setIsTeamDrawer: (isTeamDrawer: boolean) => void;
  setIsOpenDelete: (isOpenDelete: boolean) => void;
  theme: any;
  setTeamId: (teamId: number) => void;
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
