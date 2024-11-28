import TanstackTable from '@/components/Table/TanstackTable';
import { MeetingDetailsTableData } from '@/mock/modules/airSales/Dashboard/MeetingDetails';
import { columns } from './Table.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

const Table = (data: any) => {
  const meetingsData = data ? data?.data : MeetingDetailsTableData;
  return (
    <PermissionsGuard
      permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.SALES_DASHBOARD_LIST]}
    >
      <TanstackTable columns={columns} data={meetingsData} />
    </PermissionsGuard>
  );
};
export default Table;
