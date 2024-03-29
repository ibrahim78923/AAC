import Layout from '@/layout';
import { ViewInvoice } from '@/modules/airSales/Invoices/ViewInvoice';
import { Permissions } from '@/constants/permissions';

const ViewInvoicesPage = () => {
  return <ViewInvoice />;
};

export default ViewInvoicesPage;

ViewInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.AIR_SALES_INVOICES}>{page}</Layout>;
};
