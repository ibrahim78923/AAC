import { AntSwitch } from '@/components/AntSwitch';
import { FEEDBACK_STATUS } from '@/constants/strings';
import { useDefaultSurveyStatus } from './useDefaultSurveyStatus';
import { FeedbackSurveyListI } from '@/types/modules/AirServices/FeedbackSurvey';

export const DefaultSurveyStatus = ({
  rowData,
}: {
  rowData: FeedbackSurveyListI;
}) => {
  const { handleDefaultSurvey, isLoading } = useDefaultSurveyStatus();
  return (
    <AntSwitch
      checked={rowData?.isDefault}
      onClick={() => handleDefaultSurvey(rowData)}
      isLoading={isLoading}
      disabled={
        isLoading ||
        rowData?.status !== FEEDBACK_STATUS?.PUBLISHED ||
        rowData?.isDefault
      }
    />
  );
};
