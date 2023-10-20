import Layout from '@/layout';
import Quotes from '@/modules/airSales/Quotes';

const QuotesPage = () => {
  return (
    <>
      <Quotes />
    </>
  );
};

export default QuotesPage;

QuotesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
