import { Box, Typography } from '@mui/material';
import { surveyCompletedData } from './SurveyCompleted.data';
import { SURVEY_WIDGET_IDS } from '../AllResponses/AllResponses.data';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { pxToRem } from '@/utils/getFontValue';

export const SurveyCompleted = (props: any) => {
  const { data } = props;

  return (
    <Box boxShadow={2} p={2} borderRadius={2} height={'100%'}>
      <Typography variant="body4" color="slateBlue.main" component={'p'}>
        Survey Completed
      </Typography>
      <br />
      <Typography variant="h4" fontWeight={600} color="slateBlue.main">
        {`${
          data?.data?.surveyResponses?.[SURVEY_WIDGET_IDS?.SURVEY_COMPLETED] ??
          '0'
        }%`}
      </Typography>
      <CustomLinearProgress
        height={pxToRem(10)}
        progressBarColor={'success.main'}
        value={
          data?.data?.surveyResponses?.[SURVEY_WIDGET_IDS?.SURVEY_COMPLETED] ??
          0
        }
        variant="determinate"
      />
      <br />
      {Object?.entries(
        surveyCompletedData?.(data?.data?.surveyResponses) ?? {},
      )?.map(([status, progress]: any) => (
        <Box
          key={status}
          display={'flex'}
          justifyContent={'space-between'}
          gap={2}
          flexWrap={'wrap'}
          mb={1}
        >
          <Typography variant="body4" color="slateBlue.main">
            {status}
          </Typography>
          <Typography variant="body4" color="slateBlue.main">
            {progress}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
