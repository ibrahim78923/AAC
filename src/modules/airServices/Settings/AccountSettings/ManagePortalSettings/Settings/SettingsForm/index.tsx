import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { settingsFormDataArray } from './SettingsForm.data';
import { useSettingsForm } from './useSettingsForm';

export const SettingsForm = () => {
  const { methods } = useSettingsForm();
  return (
    <Box sx={{ paddingTop: '1rem' }}>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {settingsFormDataArray?.map((item: any) => (
            <Grid item sm={12} lg={item?.gridLength} key={item?._id}>
              <item.component {...item?.componentProps} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
