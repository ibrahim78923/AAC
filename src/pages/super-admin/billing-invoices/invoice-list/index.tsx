import Layout from '@/layout';
import InvoiceList from '@/modules/superAdmin/BillingAndInvoices/InvoiceList';

const InvoiceListPage = () => {
  return <InvoiceList />;
};
export default InvoiceListPage;
InvoiceListPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
