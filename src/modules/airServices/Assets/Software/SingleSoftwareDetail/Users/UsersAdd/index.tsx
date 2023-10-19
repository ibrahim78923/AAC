import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AddIconWithBgBlack } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import { FormProvider, useForm } from 'react-hook-form';
import UserSearchableSelect from '../UserSearchableSelect';

const selectOptionsUsers = [
  { title: 'Andrew', label: 'Andrew' },
  { title: 'John', label: 'John' },
  { title: 'Root', label: 'Root' },
];

const selectOptions = [
  { value: 'option1', title: 'Aws', des: `Aws Available contract: 1` },
  {
    value: 'Microsoft services',
    title: 'Microsoft services',
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
            <UserSearchableSelect
              name="selectedOption"
              options={selectOptionsUsers}
              placeholder="Select Contract"
              label="User"
              showDescription={false}
              showAsterisk={true}
              showSearchBar={true}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <UserSearchableSelect
              name="selectedOption"
              options={selectOptions}
              placeholder="Select Contract"
              showSearchBar={false}
              label="Contract"
            />
          </Box>
        </CommonModal>
      </Box>
    </FormProvider>
  );
};
