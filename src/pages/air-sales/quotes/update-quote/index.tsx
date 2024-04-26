import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import UpdateQuote from '@/modules/airSales/Quotes/UpdateQuote';

const UpdateQuotePage = () => {
  return <UpdateQuote />;
};

export default UpdateQuotePage;
UpdateQuotePage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.AIR_SALES_QUOTES}>
      {page}
    </Layout>
  );
};
