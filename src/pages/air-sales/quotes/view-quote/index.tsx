import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ViewQuote from '@/modules/airSales/Quotes/ViewQuote';

const ViewQuotePage = () => {
  return <ViewQuote />;
};

export default ViewQuotePage;
ViewQuotePage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.AIR_SALES_QUOTES}>{page}</Layout>;
};
