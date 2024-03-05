import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CatalogService from '@/modules/airCustomerPortal/Catalog/CatalogService';

const CatalogServicePage = () => {
  return <CatalogService />;
};
CatalogServicePage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permission={[
        Permissions?.AIR_CUSTOMER_PORTAL_CATALOG_DETAIL,
        '65e0175d29624d4d419196a6',
      ]}
    >
      {page}
    </Layout>
  );
};
export default CatalogServicePage;
