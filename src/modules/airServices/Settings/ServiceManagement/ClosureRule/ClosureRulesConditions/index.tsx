import { Box, Grid } from '@mui/material';

export const ClosureRulesConditions = (props: any) => {
  const {
    resolveIncident,
    closeIncident,
    serviceResolveIncident,
    serviceCloseIncident,
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
  } = props;

  return (
    <Box mt={1}>
      <Grid container>
        {closeIncident && (
          <>
            {closeIncidentData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      <Grid container>
        {resolveIncident && (
          <>
            {resolveIncidentData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      <Grid container>
        {serviceResolveIncident && (
          <>
            {serviceResolveData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      <Grid container>
        {serviceCloseIncident && (
          <>
            {serviceCloseData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};
