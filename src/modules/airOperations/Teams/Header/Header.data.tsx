import { DeleteTeam } from '../DeleteTeam';
import { OPERATIONS_TEAM_ACTIONS_CONSTANT } from '../Teams.data';
import TeamsDetails from '../TeamsDetails';
import UpsertTeams from '../UpsertTeams';

const {
  ADD_OPERATIONS_TEAM,
  EDIT_OPERATIONS_TEAM,
  DELETE_OPERATIONS_TEAM,
  OPERATIONS_TEAM_DETAIL,
} = OPERATIONS_TEAM_ACTIONS_CONSTANT;

export const operationsteamActionComponent = {
  [ADD_OPERATIONS_TEAM]: <UpsertTeams />,
  [EDIT_OPERATIONS_TEAM]: <UpsertTeams />,
  [DELETE_OPERATIONS_TEAM]: <DeleteTeam />,
  [OPERATIONS_TEAM_DETAIL]: <TeamsDetails />,
};
