import Layout from '@/layout';
import ActivityLogs from '@/modules/orgAdmin/ActivityLogs';

function ActivityLogsPage() {
  return (
    <>
      <ActivityLogs />
    </>
  );
}
export default ActivityLogsPage;
ActivityLogsPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};
