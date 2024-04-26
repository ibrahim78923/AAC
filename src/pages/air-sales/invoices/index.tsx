import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ListView from '@/modules/airSales/Invoices/ListView';

const SalesInvoicesPage = () => {
  return <ListView />;
};

export default SalesInvoicesPage;

SalesInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.AIR_SALES_INVOICES}>{page}</Layout>;
};
