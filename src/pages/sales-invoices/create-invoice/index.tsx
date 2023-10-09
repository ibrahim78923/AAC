import Layout from '@/layout';
import CreateInvoice from '@/modules/SalesInvoices/CreateInvoice';

const CreateInvoicePage = () => {
  return <CreateInvoice />;
};

export default CreateInvoicePage;

CreateInvoicePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
