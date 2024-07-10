import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertFeedbackSurvey } from '@/modules/airServices/FeedbackSurvey/UpsertFeedbackSurvey';

const UpsertFeedbackSurveyPage = () => {
  return <UpsertFeedbackSurvey />;
};

export default UpsertFeedbackSurveyPage;

UpsertFeedbackSurveyPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY}>
      {page}
    </Layout>
  );
};
