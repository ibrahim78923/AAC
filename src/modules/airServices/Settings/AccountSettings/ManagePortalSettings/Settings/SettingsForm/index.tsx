import { Box, Grid } from '@mui/material';
import { settingsFormDataArray } from './SettingsForm.data';

export const SettingsForm = () => {
  return (
    <Box sx={{ paddingTop: '1rem' }}>
      <Grid container spacing={2}>
        {settingsFormDataArray?.map((item: any) => (
          <Grid item sm={12} lg={item?.gridLength} key={item?._id}>
            <item.component {...item?.componentProps} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
