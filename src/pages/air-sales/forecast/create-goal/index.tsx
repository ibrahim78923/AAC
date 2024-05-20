import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CreateGoal from '@/modules/airSales/forecast/CreateGoal';

const CreateGoalPage = () => {
  return <CreateGoal />;
};

export default CreateGoalPage;

CreateGoalPage.getLayout = function getLayout(page: any) {
  return <Layout permissions={Permissions?.AIR_SALES_FORECAST}>{page}</Layout>;
};
