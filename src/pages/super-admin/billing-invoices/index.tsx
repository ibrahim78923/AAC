import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import BillingAndInvoices from '@/modules/superAdmin/BillingAndInvoices';

const BillingInvoicesPage = () => {
  return <BillingAndInvoices />;
};
export default BillingInvoicesPage;
BillingInvoicesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.BILLING_AND_INVOICES}>{page}</Layout>
  );
};
