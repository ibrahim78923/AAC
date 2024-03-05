import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Catalog } from '@/modules/airCustomerPortal/Catalog';

const CatalogPage = () => <Catalog />;

CatalogPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permission={[
        Permissions?.AIR_CUSTOMER_PORTAL_CATALOG,
        '6565bf7695129275781dda3b',
      ]}
    >
      {page}
    </Layout>
  );
};

export default CatalogPage;
