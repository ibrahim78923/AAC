import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

export const UpsertConsumer = () => {
  const methods = useForm();
  return (
    <Box>
      <PageTitledHeader title={'Consumer'} canMovedBack />

      <FormProvider methods={methods}>
        <Typography variant={'h5'}>Information</Typography>
      </FormProvider>
    </Box>
  );
};
