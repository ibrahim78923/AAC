import Layout from '@/layout';
import CatalogService from '@/modules/airCustomerPortal/Catalog/CatalogService';

const CatalogServicePage = () => {
  return <CatalogService />;
};
CatalogServicePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default CatalogServicePage;
