import Layout from '@/layout';
import { Catalog } from '@/modules/airCustomerPortal/Catalog';

const CatalogPage = () => <Catalog />;

CatalogPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};

export default CatalogPage;
