import { FeedbackSurveySectionI } from '@/types/modules/AirServices/FeedbackSurvey';

export const usePreviewSurvey = (props: {
  data: FeedbackSurveySectionI[];
  setCreateSurvey: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, setCreateSurvey } = props;
  const handleMoveBack = () => {
    setCreateSurvey('feedback');
  };
  return {
    data,
    handleMoveBack,
  };
};
