import { CustomCircularProgressBar } from '@/components/CustomCircularProgressBar';
import { Box, Typography, useTheme } from '@mui/material';
import { SURVEY_WIDGET_IDS } from '../AllResponses/AllResponses.data';
import { FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE_DESCRIPTION } from './TotalSurveyScore.data';

export const TotalSurveyScore = (props: any) => {
  const { data } = props;
  const theme = useTheme();
  return (
    <Box boxShadow={2} p={2} borderRadius={2} height={'100%'}>
      <Typography variant="body4" color="slateBlue.main" component={'p'}>
        Total Survey Score
      </Typography>
      <br />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        gap={2.5}
        flexWrap={'wrap'}
        my={1}
      >
        <Box>
          <CustomCircularProgressBar
            size={150}
            thickness={3}
            progressColor={theme?.palette?.warning?.main}
            percentage={
              !!data?.data?.surveyResponses?.[
                SURVEY_WIDGET_IDS?.TOTAL_SURVEY_SCORE
              ]
                ? data?.data?.surveyResponses?.[
                    SURVEY_WIDGET_IDS?.TOTAL_SURVEY_SCORE
                  ] * 20
                : 0
            }
            value={
              data?.data?.surveyResponses?.[
                SURVEY_WIDGET_IDS?.TOTAL_SURVEY_SCORE
              ] ?? 0
            }
          />
        </Box>
        <Box flex={1}>
          <Typography variant="h4" color="slateBlue.main">
            {data?.data?.surveyResponses?.[
              SURVEY_WIDGET_IDS?.SATISFACTION_LEVEL
            ] ?? '---'}
          </Typography>
          <Typography variant="body2" color="slateBlue.main" my={0.5}>
            {FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE_DESCRIPTION?.[
              data?.data?.surveyResponses?.[
                SURVEY_WIDGET_IDS?.SATISFACTION_LEVEL
              ]
            ]?.title ?? '---'}
          </Typography>
          <Typography variant="body4" color="slateBlue.main">
            {FEEDBACK_SURVEY_QUESTION_RESPONSE_GRADE_DESCRIPTION?.[
              data?.data?.surveyResponses?.[
                SURVEY_WIDGET_IDS?.SATISFACTION_LEVEL
              ]
            ]?.description ?? '---'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
