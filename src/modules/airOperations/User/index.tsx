import { useAppDispatch } from '@/redux/store';
import { Header } from './Header';
import { UserList } from './UserList';
import { useEffect } from 'react';
import { resetComponentState } from '@/redux/slices/airOperations/users/slice';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';

export const User = () => {
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
          AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.USER_LIST,
        ]}
      >
        <UserList />
      </PermissionsGuard>
    </>
  );
};
