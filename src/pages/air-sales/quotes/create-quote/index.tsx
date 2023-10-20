import Layout from '@/layout';
import CreateQuote from '@/modules/airSales/Quotes/CreateQuote';

const CreateQuotePage = () => {
  return <CreateQuote />;
};

export default CreateQuotePage;
CreateQuotePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
