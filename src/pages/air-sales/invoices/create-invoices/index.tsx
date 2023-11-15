import Layout from '@/layout';
import CreateInvoice from '@/modules/airSales/Invoices/CreateInvoice';

const CreateInvoicesPage = () => {
  return <CreateInvoice />;
};

export default CreateInvoicesPage;

CreateInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
