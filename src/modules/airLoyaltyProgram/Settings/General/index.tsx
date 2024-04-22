import { Box, Grid, Typography } from '@mui/material';
import { generalFormFields } from './General.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

export const General = () => {
  const method = useForm();
  return (
    <Box mt={2}>
      <Typography variant="h3" fontWeight={500}>
        General
      </Typography>
      <FormProvider methods={method}>
        <Grid container display={'block'}>
          {generalFormFields?.map((item: any) => (
            <Grid item md={item?.md} key={item?.id} mt={1}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
