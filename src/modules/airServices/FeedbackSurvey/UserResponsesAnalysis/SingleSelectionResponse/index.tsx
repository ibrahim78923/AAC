import { MultiLevelLinearProgressBar } from '@/components/MultiLevelLinearProgressBar';
import { FeedbackResponsesAnalysisI } from '@/types/modules/AirServices/FeedbackSurvey';
import { Box, Typography } from '@mui/material';

export const SingleSelectionResponse: React.FC<FeedbackResponsesAnalysisI> = (
  props,
) => {
  const { question, score, answers } = props;
  return (
    <Box bgcolor={'common.white'} p={2} boxShadow={1} borderRadius={2}>
      <Box display={'flex'} justifyContent={'space-between'} gap={2}>
        <Typography variant="h6" color="slateBlue.main">
          {question}
        </Typography>
        {!!score && (
          <Typography variant="body2" color="slateBlue.main">
            Score: {score}
          </Typography>
        )}
      </Box>
      <br />
      <MultiLevelLinearProgressBar valuesArray={answers} />
    </Box>
  );
};
