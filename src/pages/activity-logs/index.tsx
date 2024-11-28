import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
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
  return (
    <Layout guardRoute permissions={Permissions?.ORG_ADMIN_DASHBOARD}>
      {page}
    </Layout>
  );
};
