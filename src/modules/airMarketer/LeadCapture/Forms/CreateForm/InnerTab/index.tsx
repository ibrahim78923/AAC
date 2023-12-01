import { Box, Button, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import {
  verifyEmailArray,
  verifyEmailDefaultValues,
  verifyEmailValidationSchema,
} from '../CreateForm.data';
import { yupResolver } from '@hookform/resolvers/yup';

const InnerTab = () => {
  const VerifyEmailForm = useForm({
    resolver: yupResolver(verifyEmailValidationSchema),
    defaultValues: verifyEmailDefaultValues,
  });

  const onSubmit = async () => {};

  const { handleSubmit } = VerifyEmailForm;
  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Hi there!{' '}
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: 'center', marginBottom: '20px' }}
      >
        Please fill in the attributes below to continue.
      </Typography>
      <FormProvider methods={VerifyEmailForm} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {verifyEmailArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component
                {...item?.componentProps}
                size={'small'}
              ></item.component>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          sx={{ marginTop: '10px', width: 'fit-content' }}
          type="submit"
        >
          submit
        </Button>
      </FormProvider>
    </Box>
  );
};

export default InnerTab;
