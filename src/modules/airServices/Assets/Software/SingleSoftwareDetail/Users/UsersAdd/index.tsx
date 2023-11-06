import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormProvider, useForm } from 'react-hook-form';
import UserSearchableSelect from '../UsersSearchableSelect';
import ConversationModel from '@/components/Model/CoversationModel';
import { enqueueSnackbar } from 'notistack';
import { UserSelectOption, UserSelectData } from './UsersAdd.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
              startIcon={<AddCircleIcon />}
              color="secondary"
            >
              Add User
            </Button>
          </Grid>
        </Grid>

        <ConversationModel
          open={isModalOpen}
          handleClose={closeModal}
          selectedItem="Add User"
          okText="Add"
          footer={true}
        >
          <Box>
            <UserSearchableSelect
              name="selectedOption"
              options={UserSelectOption}
              placeholder="Select Contract"
              label="User"
              showDescription={false}
              showAsterisk={false}
              showSearchBar={true}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <UserSearchableSelect
              name="selectedOption"
              options={UserSelectData}
              placeholder="Select Contract"
              showSearchBar={false}
              label="Contract"
            />
          </Box>
          <Box
            gap={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: 'auto',
              mt: 2,
            }}
          >
            <Button variant="outlined" color="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                enqueueSnackbar('Add successfully', {
                  variant: 'success',

                  autoHideDuration: 2000,
                });

                setModalOpen(false);
              }}
            >
              ADD
            </Button>
          </Box>
        </ConversationModel>
      </Box>
    </FormProvider>
  );
};
