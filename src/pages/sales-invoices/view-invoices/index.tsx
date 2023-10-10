import Layout from '@/layout';
import { ViewInvoice } from '@/modules/SalesInvoices/ViewInvoice';

const ViewInvoicesPage = () => {
  return <ViewInvoice />;
};

export default ViewInvoicesPage;

ViewInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
