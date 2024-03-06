import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { DataManagement } from '@/modules/airOperations/DataManagement';

const DataManagementPage = () => {
  return <DataManagement />;
};

export default DataManagementPage;

DataManagementPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_DATA_MANAGEMENT}>
      {page}
    </Layout>
  );
};
