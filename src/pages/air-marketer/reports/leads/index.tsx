import Layout from '@/layout';
import LeadaReports from '@/modules/airMarketer/Reports/LeadsReports';
import { Permissions } from '@/constants/permissions';

const LeadsPage = () => {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_REPORTS}>
      <LeadaReports />
    </Layout>
  );
};

export default LeadsPage;
