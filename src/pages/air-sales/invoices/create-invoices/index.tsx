import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Invoices from '@/modules/airSales/Invoices';

const CreateInvoicesPage = () => {
  return <Invoices />;
};

export default CreateInvoicesPage;

CreateInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.AIR_SALES_INVOICES}>{page}</Layout>;
};
