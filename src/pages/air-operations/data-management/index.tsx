import Layout from '@/layout';
import { DataManagement } from '@/modules/airOperations/DataManagement';

const DataManagementPage = () => {
  return <DataManagement />;
};

export default DataManagementPage;

DataManagementPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
