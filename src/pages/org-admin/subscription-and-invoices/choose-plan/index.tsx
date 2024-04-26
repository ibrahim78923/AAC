import Layout from '@/layout';
import ChoosePlan from '@/modules/orgAdmin/SubscriptionAndInvoices/ChoosePlan';
import { Permissions } from '@/constants/permissions';

const ChoosePlanPage = () => {
  return <ChoosePlan />;
};

export default ChoosePlanPage;
ChoosePlanPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      guardRoute
      permissions={Permissions?.ORG_ADMIN_SUBSCRIPTION_AND_INVOICE}
    >
      {page}
    </Layout>
  );
};
