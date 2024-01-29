import { Box } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useUsersAdd from '../UsersAdd/useUsersAdd';

const UsersAllocate = () => {
  const { contractDropdown } = useUsersAdd();
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Box maxWidth={'sm'}>
        <RHFAutocompleteAsync
          name="category"
          label="Category"
          select={true}
          md={12}
          apiQuery={contractDropdown}
          getOptionLabel={(option: any) => option?.name}
        />
      </Box>
    </FormProvider>
  );
};

export default UsersAllocate;
