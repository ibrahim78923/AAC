import { useAppDispatch } from '@/redux/store';
import { Header } from './Header';
import { TeamsList } from './TeamsList';
import { resetComponentState } from '@/redux/slices/airOperations/teams/slice';
import { useEffect } from 'react';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS } from '@/constants/permission-keys';

export const Teams = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return (
    <>
      <Header />
      <br />
      <PermissionsGuard
        permissions={[
          AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.TEAM_LIST,
        ]}
      >
        <TeamsList />
      </PermissionsGuard>
    </>
  );
};
