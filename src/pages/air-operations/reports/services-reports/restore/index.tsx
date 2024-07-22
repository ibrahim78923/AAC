import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ServicesReportsRestore } from '@/modules/airOperations/Reports/ServicesReports/ServicesReportsRestore';

const ServicesReportsRestorePage = () => {
  return <ServicesReportsRestore />;
};

export default ServicesReportsRestorePage;

ServicesReportsRestorePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATION_RESTORE_REPORTS_SERVICES}>
      {page}
    </Layout>
  );
};
