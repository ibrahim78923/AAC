import { Box, Grid } from '@mui/material';
import { IClosureRuleProps } from '../ClosureRule.interface';

export const ClosureRulesConditions = (props: IClosureRuleProps) => {
  const {
    closeIncident,
    closeIncidentData,
    resolveIncident,
    resolveIncidentData,
    serviceResolveIncident,
    serviceResolveData,
    serviceCloseIncident,
    serviceCloseData,
  } = props;

  const renderConditions = (condition: boolean | undefined, data: any[]) => {
    if (!condition || !data) return null;
    return data?.map((item: any) => (
      <Grid item xs={12} md={item?.md} key={item?.id}>
        <item.component {...item?.componentProps} />
      </Grid>
    ));
  };

  return (
    <Box mt={1}>
      <Grid container>
        {renderConditions(closeIncident || false, closeIncidentData)}
      </Grid>
      <Grid container>
        {renderConditions(resolveIncident || false, resolveIncidentData)}
      </Grid>
      <Grid container>
        {renderConditions(serviceResolveIncident || false, serviceResolveData)}
      </Grid>
      <Grid container>
        {renderConditions(serviceCloseIncident || false, serviceCloseData)}
      </Grid>
    </Box>
  );
};
