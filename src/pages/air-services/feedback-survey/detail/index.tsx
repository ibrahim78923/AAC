import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { SingleDetailFeedbackSurvey } from '@/modules/airServices/FeedbackSurvey/SingleDetailFeedbackSurvey';

const FeedbackSurveyDetailPage = () => {
  return <SingleDetailFeedbackSurvey />;
};

export default FeedbackSurveyDetailPage;

FeedbackSurveyDetailPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT}>
      {page}
    </Layout>
  );
};
