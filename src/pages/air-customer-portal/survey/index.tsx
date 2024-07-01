import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertSurveyResponse } from '@/modules/airServices/FeedbackSurvey/UpsertSurveyReponse';

const SurveyPage = () => {
  return <UpsertSurveyResponse />;
};

export default SurveyPage;

SurveyPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_OPERATIONS_WORKFLOWS}>{page}</Layout>
  );
};
