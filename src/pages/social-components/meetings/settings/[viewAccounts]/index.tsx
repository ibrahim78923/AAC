import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { ViewAccounts } from '@/modules/SocialComponents/Meetings/CalendarIntegration/ViewAccounts';

const ViewAccountsPage = () => {
  return <ViewAccounts />;
};
export default ViewAccountsPage;

ViewAccountsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SOCIAL_COMPONENTS_MEETINGS}>
      {page}
    </Layout>
  );
};
