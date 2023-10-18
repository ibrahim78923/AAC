import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AddIconWithBgBlack } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import { FormProvider, useForm } from 'react-hook-form';
import UserSearchableSelect from '../UserSearchableSelect';
import { RHFSearchableSelect } from '@/components/ReactHookForm';

const selectOptions1 = [
  { id: 'Andrew', label: 'Andrew' },
  { id: 'John', label: 'John' },
  { id: 'Root', label: 'Root' },
];

const selectOptions = [
  { value: 'option1', title: 'Aws', des: `Aws Available contract: 1` },
  {
    value: 'Microsoft services',
    title: 'Option 2',
    des: `Microsoft services Available contract: Unlimited`,
  },
  { value: 'Figma', title: 'Figma', des: ` Figma Available contract: 1` },
];

export const UsersAdd = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={openModal}
              startIcon={<AddIconWithBgBlack />}
              color="secondary"
              sx={{
                p: 2,
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }}
            >
              Add User
            </Button>
          </Grid>
        </Grid>

        <CommonModal
          open={isModalOpen}
          handleClose={closeModal}
          handleSubmit={closeModal}
          title="Add User"
          okText="Add"
          footer={true}
        >
          <Box>
            <RHFSearchableSelect
              name="selectName1"
              options={selectOptions1}
              control={methods.control}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <UserSearchableSelect
              name="selectedOption"
              options={selectOptions}
              placeholder="Search..."
              label="Field Label"
            />
          </Box>
        </CommonModal>
      </Box>
    </FormProvider>
  );
};
