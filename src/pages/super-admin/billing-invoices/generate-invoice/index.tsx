import Layout from '@/layout';
import GenerateInvoice from '@/modules/superAdmin/BillingAndInvoices/GenerateInvoice';

const GenerateInvoicePage = () => {
  return <GenerateInvoice />;
};
export default GenerateInvoicePage;
GenerateInvoicePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
