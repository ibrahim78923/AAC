import { Box, Grid } from '@mui/material';
import {
  conditionsDataArray,
  conditionsValidationSchema,
  conditionsDefaultValues,
} from './ClosureRulesConditions.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const ClosureRulesConditions = () => {
  const methods: any = useForm<any>({
    resolver: yupResolver(conditionsValidationSchema),
    defaultValues: conditionsDefaultValues,
  });

  return (
    <Box mt={1}>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {conditionsDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
