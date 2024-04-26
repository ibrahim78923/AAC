import CustomLabel from '@/components/CustomLabel';
import { Box, Grid } from '@mui/material';
import { expirationDurationFieldsData } from './ExpirationDuration.data';

export const ExpirationDuration = () => {
  return (
    <>
      <CustomLabel label="Expiration Duration" />
      <Box
        sx={{
          border: '0.06rem solid',
          borderColor: 'grey.700',
          borderRadius: 2,
          p: '0.45rem 1rem',
        }}
        overflow="hidden"
      >
        <Grid container>
          {expirationDurationFieldsData?.map((form: any) => {
            return (
              <Grid item xs={3} md={form?.gridLength} key={form?.id}>
                <form.component {...form?.componentProps} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
