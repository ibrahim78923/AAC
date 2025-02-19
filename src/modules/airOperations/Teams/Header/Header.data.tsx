import dynamic from 'next/dynamic';
import { OPERATIONS_TEAM_ACTIONS_CONSTANT } from '../Teams.data';
import LazyLoadingFlow from '@/components/LazyLoadingFlow';

const DeleteTeam = dynamic(() => import('../DeleteTeam'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="delete user"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});
const UpsertTeams = dynamic(() => import('../UpsertTeams'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="upsert team"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});
const TeamsDetails = dynamic(() => import('../TeamsDetails'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="team detail"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const {
  ADD_OPERATIONS_TEAM,
  EDIT_OPERATIONS_TEAM,
  DELETE_OPERATIONS_TEAM,
  OPERATIONS_TEAM_DETAIL,
} = OPERATIONS_TEAM_ACTIONS_CONSTANT;

export const operationsTeamActionComponent = {
  [ADD_OPERATIONS_TEAM]: <UpsertTeams />,
  [EDIT_OPERATIONS_TEAM]: <UpsertTeams />,
  [DELETE_OPERATIONS_TEAM]: <DeleteTeam />,
  [OPERATIONS_TEAM_DETAIL]: <TeamsDetails />,
};
