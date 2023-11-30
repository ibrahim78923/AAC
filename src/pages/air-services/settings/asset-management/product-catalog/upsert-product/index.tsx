import Layout from '@/layout';
import { UpsertProductCatalog } from '@/modules/airServices/Settings/AssetManagement/ProductCatalog/UpsertProductCatalog';

const UpsertProductCatalogPage = () => {
  return <UpsertProductCatalog />;
};

export default UpsertProductCatalogPage;

UpsertProductCatalogPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
