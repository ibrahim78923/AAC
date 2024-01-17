import { Box, Grid, Typography } from '@mui/material';
import {
  modulesLoyaltyDataGenral,
  modulesLoyaltyDataAttribute,
} from './Loyalty.data';
import { useForm } from 'react-hook-form';
import { FormProvider } from '@/components/ReactHookForm';

const Loyalty = () => {
  const method = useForm();
  return (
    <Box>
      <Typography variant="h3" pb={2.4} textTransform="capitalize">
        Loyalty
      </Typography>
      <Typography variant="h4" bgcolor={'primary.lighter'} pl={1}>
        General
      </Typography>

      <FormProvider methods={method}>
        <Grid container display={'block'} pt={2} pb={2}>
          {modulesLoyaltyDataGenral?.map((item) => (
            <Grid item md={4} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
      <Typography variant="h4" bgcolor={'primary.lighter'} pl={1}>
        Attributes
      </Typography>
      <FormProvider methods={method}>
        <Grid container spacing={2} display={'block'} pt={2}>
          {modulesLoyaltyDataAttribute?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default Loyalty;
