import { Box, Grid } from '@mui/material';
import { SurveyWidgets } from '../SurveyWidgets';
import { SurveyCompleted } from '../SurveyCompleted';
import { TotalSurveyScore } from '../TotalSurveyScore';
import { Respondents } from '../Respondents';

export const AllResponses = () => {
  return (
    <>
      <Box>
        <SurveyWidgets />
      </Box>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <SurveyCompleted />
        </Grid>
        <Grid item xs={12} md={4.5}>
          <TotalSurveyScore />
        </Grid>
        <Grid item xs={12} md={4.5}>
          <Respondents />
        </Grid>
      </Grid>
    </>
  );
};
