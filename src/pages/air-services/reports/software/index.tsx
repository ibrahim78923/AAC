import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SoftwareReports } from '@/modules/airServices/Assets/Software/SoftwareReports';

const SoftwareReportsPage = () => {
  return <SoftwareReports />;
};

export default SoftwareReportsPage;

SoftwareReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_REPORTS_SOFTWARE}>
      {page}
    </Layout>
  );
};
