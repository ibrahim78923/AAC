import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ISettingsDataItem } from './Settings.interface';
import { useSettings } from './useSettings';

export const Settings = () => {
  const { settingsMethods, settingsDataArray, checkApiErrorOrLoading } =
    useSettings();

  return (
    <Box border={'.1rem solid'} borderColor={'grey.700'} p={2} borderRadius={4}>
      {checkApiErrorOrLoading?.() ?? (
        <>
          <Typography variant="h4">Security Help Desk</Typography>
          <Box bgcolor={'grey.100'} borderRadius={3} p={2} mt={1}>
            <FormProvider methods={settingsMethods}>
              <Grid container spacing={2}>
                {settingsDataArray?.map((item: ISettingsDataItem) => (
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
        </>
      )}
    </Box>
  );
};
