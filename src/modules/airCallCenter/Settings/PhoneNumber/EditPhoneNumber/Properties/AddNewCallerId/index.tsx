import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  addNewNumberDefaultValues,
  addNewNumberValidationSchema,
} from '../Properties.data';

const AddNewCallerId = (props: any) => {
  const { isNewNumber, setISNewNumber, setIsVerification } = props;

  const methods: any = useForm({
    resolver: yupResolver(addNewNumberValidationSchema),
    defaultValues: addNewNumberDefaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = () => {
    setIsVerification(true);
    setISNewNumber(false);
  };
  return (
    <>
      <CommonModal
        open={isNewNumber}
        handleClose={() => setISNewNumber(false)}
        handleCancel={() => setISNewNumber(false)}
        handleSubmit={handleSubmit(onSubmit)}
        title="Add New Caller ID"
        okText="Verify"
        cancelText="Cancel"
        footer
      >
        <FormProvider methods={methods}>
          <Grid item xs={12}>
            <RHFTextField
              name="phoneNumber"
              label="Phone Number"
              required={true}
            />
          </Grid>
        </FormProvider>
      </CommonModal>
    </>
  );
};

export default AddNewCallerId;
