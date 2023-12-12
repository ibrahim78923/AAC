import Layout from '@/layout';
import { UpsertService } from '@/modules/airServices/Settings/ServiceManagement/ServicesCatalog/Services/UpsertService';

const UpsertServicePage = () => {
  return <UpsertService />;
};

export default UpsertServicePage;

UpsertServicePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
