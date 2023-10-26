import { Box } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import UserSearchableSelect from '../UsersSearchableSelect';

const userAllocateSelectOptions = [
  { value: 'option1', title: 'Aws', des: `Aws Available contract: 1` },
  {
    value: 'Microsoft services',
    title: 'Microsoft services',
    des: `Microsoft services Available contract: Unlimited`,
  },
  { value: 'Figma', title: 'Figma', des: ` Figma Available contract: 1` },
];

const UserAllocate = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Box>
        <UserSearchableSelect
          name="selectedOption"
          options={userAllocateSelectOptions}
          placeholder="Select Contract"
          showSearchBar={false}
          label="Contract"
        />
      </Box>
    </FormProvider>
  );
};

export default UserAllocate;
