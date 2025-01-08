import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import { dynamicProgressBarColor } from '../UserResponsesAnalysis.data';
import { v4 as uuidv4 } from 'uuid';
import { FeedbackResponsesAnalysisI } from '@/types/modules/AirServices/FeedbackSurvey';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { pxToRem } from '@/utils/getFontValue';

export const MultipleSelectionResponse: React.FC<FeedbackResponsesAnalysisI> = (
  props,
) => {
  const { answers, question } = props;
  return (
    <Box bgcolor={'common.white'} p={2} boxShadow={1} borderRadius={2}>
      <Typography variant="body2">{question}</Typography>
      <br />
      {answers?.map((answer) => (
        <Fragment key={uuidv4()}>
          <Typography variant="body2" component={'p'}>
            {answer?.text}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <CustomLinearProgress
                variant="determinate"
                value={answer?.percentage}
                backgroundBarColor={'transparent'}
                progressBarColor={dynamicProgressBarColor?.(answer?.percentage)}
                height={pxToRem(10)}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >{`${Math?.round(answer?.percentage)}%`}</Typography>
            </Box>
          </Box>
        </Fragment>
      ))}
    </Box>
  );
};
