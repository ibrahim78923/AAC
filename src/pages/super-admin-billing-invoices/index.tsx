import Layout from '@/layouts/Layout';
import BillingAndInvoicesTable from '@/modules/BillingAndInvoices/BillingAndInvoicesTable';
const BillingInvoicesPage = () => {
  return <BillingAndInvoicesTable />;
};
export default BillingInvoicesPage;
BillingInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
