import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { TasksList } from './TasksList';
import { Header } from './Header';

export const Tasks = () => {
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
