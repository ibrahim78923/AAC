import { Box, Button, Grid, Typography } from '@mui/material';
import { styles } from './VerifyEmail.style';
import { FormProvider } from '@/components/ReactHookForm';
import {
  verifyEmailArray,
  verifyEmailDefaultValues,
  verifyEmailValidationSchema,
} from './VerifyEmail.data';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const VerifyEmail = () => {
  const VerifyEmailForm = useForm({
    resolver: yupResolver(verifyEmailValidationSchema),
    defaultValues: verifyEmailDefaultValues,
  });

  const onSubmit = async () => {};

  const { handleSubmit } = VerifyEmailForm;

  return (
    <Box sx={styles.mainDiv}>
      <Box sx={styles.subDiv}>
        <Box sx={styles.innerBox}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Please verify yourself{' '}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', marginBottom: '20px' }}
          >
            Before you can continue, we would like to verify your email.
          </Typography>
          <FormProvider
            methods={VerifyEmailForm}
            onSubmit={handleSubmit(onSubmit)}
          >
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
      </Box>
    </Box>
  );
};

export default VerifyEmail;
