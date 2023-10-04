import Layout from '@/layout';
import BillingAndInvoicesTable from '@/modules/superAdmin/BillingAndInvoices/BillingAndInvoicesTable';

const BillingInvoicesPage = () => {
  return <BillingAndInvoicesTable />;
};
export default BillingInvoicesPage;
BillingInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
