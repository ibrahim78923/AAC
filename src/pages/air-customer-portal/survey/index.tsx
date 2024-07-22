import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { CustomerSurvey } from '@/modules/airCustomerPortal/Tickets/CustomerSurvey';

const SurveyPage = () => {
  return <CustomerSurvey />;
};

export default SurveyPage;

SurveyPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
