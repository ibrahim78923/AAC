import Layout from '@/layout';
import ManagePlan from '@/modules/orgAdmin/SubscriptionAndInvoices/ManagePlan';

const ManagePlanPage = () => {
  return <ManagePlan />;
};

export default ManagePlanPage;
ManagePlanPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
