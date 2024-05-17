import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { FeedbackSurvey } from '@/modules/airServices/FeedbackSurvey';

const FeedbackSurveyPage = () => {
  return <FeedbackSurvey />;
};

export default FeedbackSurveyPage;

FeedbackSurveyPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT}>
      {page}
    </Layout>
  );
};
