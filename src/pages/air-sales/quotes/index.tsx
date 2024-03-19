import { Permissions } from '@/constants/permissions';
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
  return (
    <Layout guardRoute permissions={Permissions?.AIR_SALES_QUOTES}>
      {page}
    </Layout>
  );
};
