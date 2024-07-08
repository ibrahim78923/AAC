import { Grid, useTheme } from '@mui/material';
import { SurveyCard } from '../SurveyCard';
import { surveyWidgetsData } from './SurveyWidgets.data';

export const SurveyWidgets = (props: any) => {
  const { data } = props;
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      {surveyWidgetsData(data?.data?.surveyResponses, theme)?.map(
        (widget: any) => (
          <Grid item xs={12} md={4} lg={4} key={widget?.id}>
            <SurveyCard
              data={widget}
              hasSpinner={widget?.hasSpinner}
              hasStatusIcon={widget?.hasStatusIcon}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
};
