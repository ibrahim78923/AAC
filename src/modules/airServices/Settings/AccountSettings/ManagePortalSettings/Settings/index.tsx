import { Box, Grid, Typography } from '@mui/material';
import { useSettings } from './useSettings';
import { FormProvider } from '@/components/ReactHookForm';

export const Settings = () => {
  const { settingsMethods, settingsDataArray } = useSettings();

  return (
    <Box border={'.1rem solid'} borderColor={'grey.700'} p={2} borderRadius={4}>
      <Typography variant="h4">Security Help Desk</Typography>
      <Box bgcolor={'grey.100'} borderRadius={3} p={2} mt={1}>
        <FormProvider methods={settingsMethods}>
          <Grid container spacing={2}>
            {settingsDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  disabled
                />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};
