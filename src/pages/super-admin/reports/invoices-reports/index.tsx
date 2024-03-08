import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import InvoicesReports from '@/modules/superAdmin/Reports/InvoicesReports';

const InvoicesReportsPage = () => {
  return <InvoicesReports />;
};

export default InvoicesReportsPage;
InvoicesReportsPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.SUPER_ADMIN_REPORTS}>{page}</Layout>;
};
