import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CatalogService from '@/modules/airCustomerPortal/Catalog/CatalogService';

const CatalogServicePage = () => {
  return <CatalogService />;
};
CatalogServicePage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_CATALOG_DETAIL}>
      {page}
    </Layout>
  );
};
export default CatalogServicePage;
