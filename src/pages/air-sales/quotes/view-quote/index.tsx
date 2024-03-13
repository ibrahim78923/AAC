import Layout from '@/layout';
import ViewQuote from '@/modules/airSales/Quotes/ViewQuote';

const ViewQuotePage = () => {
  return <ViewQuote />;
};

export default ViewQuotePage;
ViewQuotePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
