import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  sixDigitDefaultValues,
  sixDigitValidationSchema,
} from '../Properties.data';

const VerifyCode = (props: any) => {
  const { isVerification, setIsVerification, setCallerIDCreated } = props;

  const methods: any = useForm({
    resolver: yupResolver(sixDigitValidationSchema),
    defaultValues: sixDigitDefaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = () => {
    setCallerIDCreated(true);
    setIsVerification(false);
  };
  return (
    <CommonModal
      open={isVerification}
      handleClose={() => setIsVerification(false)}
      handleCancel={() => setIsVerification(false)}
      handleSubmit={handleSubmit(onSubmit)}
      title="Add New Caller ID"
      okText={'Verify'}
      cancelText={'Close'}
      footer
    >
      <FormProvider methods={methods}>
        <Grid item xs={12}>
          <Box display="flex" flexDirection={'column'} gap={2}>
            <Typography variant="body1">
              Answer The phone and enter 6 digiut code below
            </Typography>
            <RHFTextField name="code" required={true} />
          </Box>
        </Grid>
      </FormProvider>
    </CommonModal>
  );
};

export default VerifyCode;
