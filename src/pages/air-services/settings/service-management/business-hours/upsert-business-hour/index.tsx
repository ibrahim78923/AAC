import Layout from '@/layout';
import { CreateBusinessHour } from '@/modules/airServices/Settings/ServiceManagement/BusinessHours/CreateBusinessHour';

const CreateBusinessHourPage = () => {
  return <CreateBusinessHour />;
};

export default CreateBusinessHourPage;

CreateBusinessHourPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
