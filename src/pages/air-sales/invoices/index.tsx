import Layout from '@/layout';
import Invoices from '@/modules/airSales/Invoices';

const SalesInvoicesPage = () => {
  return <Invoices />;
};

export default SalesInvoicesPage;

SalesInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
