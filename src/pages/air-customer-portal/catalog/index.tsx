import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Catalog } from '@/modules/airCustomerPortal/Catalog';

const CatalogPage = () => <Catalog />;

CatalogPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_CUSTOMER_PORTAL_CATALOG}>
      {page}
    </Layout>
  );
};

export default CatalogPage;
