import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { TasksList } from './TasksList';
import { Header } from './Header';
import { useAppDispatch } from '@/redux/store';
import { resetComponentState } from '@/redux/slices/airServices/tickets-tasks/slice';
import { useEffect } from 'react';

export const Tasks = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return (
    <>
      <Header />
      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.TASK_LIST_VIEW]}
      >
        <TasksList />
      </PermissionsGuard>
    </>
  );
};
