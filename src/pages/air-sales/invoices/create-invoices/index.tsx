import Layout from '@/layout';
import Invoices from '@/modules/airSales/Invoices';

const CreateInvoicesPage = () => {
  return <Invoices />;
};

export default CreateInvoicesPage;

CreateInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
