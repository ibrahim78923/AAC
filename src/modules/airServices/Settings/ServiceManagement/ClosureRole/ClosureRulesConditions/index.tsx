import { Box, Grid } from '@mui/material';
import {
  closeIncidentDataArray,
  resolveIncidentDataArray,
  serviceCloseDataArray,
  serviceResolveDataArray,
} from './ClosureRulesConditions.data';

export const ClosureRulesConditions = (props: any) => {
  const {
    resolveIncident,
    closeIncident,
    serviceResolveIncident,
    serviceCloseIncident,
  } = props;

  return (
    <Box mt={1}>
      <Grid container>
        {closeIncident && (
          <>
            {closeIncidentDataArray?.map((item: any) => (
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
            {resolveIncidentDataArray?.map((item: any) => (
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
            {serviceResolveDataArray?.map((item: any) => (
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
            {serviceCloseDataArray?.map((item: any) => (
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
