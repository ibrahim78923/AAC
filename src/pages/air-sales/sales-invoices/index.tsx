import Layout from '@/layout';
import SalesInvoices from '@/modules/airSales/Invoices';

const SalesInvoicesPage = () => {
  return <SalesInvoices />;
};

export default SalesInvoicesPage;

SalesInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
