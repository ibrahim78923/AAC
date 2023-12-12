import { Box } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RHFAutocomplete } from '@/components/ReactHookForm';

const userAllocateSelectOptions = ['BE1', 'BE2', 'BE3'];

const UsersAllocate = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Box maxWidth={'sm'}>
        <RHFAutocomplete
          name="selectedOption"
          options={userAllocateSelectOptions}
          placeholder="Select Contract"
          label="Contract"
        />
      </Box>
    </FormProvider>
  );
};

export default UsersAllocate;
