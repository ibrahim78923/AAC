import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ContractsReports } from '@/modules/airServices/Assets/Contracts/ContractsReports';

const ContractsReportsPage = () => {
  return <ContractsReports />;
};

export default ContractsReportsPage;

ContractsReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT}>
      {page}
    </Layout>
  );
};
