import Layout from '@/layout';
import TaskViewCard from '@/modules/airMarketer/Campaigns/Tasks/TaskCardView';

const TaskCardPage = () => {
  return <TaskViewCard />;
};
export default TaskCardPage;
TaskCardPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
