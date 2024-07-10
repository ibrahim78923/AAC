export const usePreviewSurvey = (props: any) => {
  const { data, setCreateSurvey } = props;
  const surveyData = data?.data?.sections;
  const handleMoveBack = () => {
    setCreateSurvey('feedback');
  };
  return {
    surveyData,
    handleMoveBack,
  };
};
