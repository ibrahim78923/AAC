import { Box, Grid, Typography } from '@mui/material';
import { generalTabData } from './GeneralTab.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

export const Generaltab = () => {
  const method = useForm();
  return (
    <Box mt={2}>
      <Typography variant="h4" fontWeight={500} bgcolor={'grey.200'}>
        General
      </Typography>
      <FormProvider methods={method}>
        <Grid container display={'block'}>
          {generalTabData?.map((item) => (
            <Grid item md={item?.md} key={item?.id} mt={1}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
