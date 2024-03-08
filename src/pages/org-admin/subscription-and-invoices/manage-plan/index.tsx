import Layout from '@/layout';
import ManagePlan from '@/modules/orgAdmin/SubscriptionAndInvoices/ManagePlan';
import { Permissions } from '@/constants/permissions';

const ManagePlanPage = () => {
  return <ManagePlan />;
};

export default ManagePlanPage;
ManagePlanPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={Permissions?.ORG_ADMIN_SUBSCRIPTION_AND_INVOICE}
    >
      {page}
    </Layout>
  );
};
