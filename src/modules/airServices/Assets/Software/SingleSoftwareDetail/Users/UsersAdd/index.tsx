import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormProvider, useForm } from 'react-hook-form';
import UserSearchableSelect from '../UsersSearchableSelect';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { enqueueSnackbar } from 'notistack';
import { userSelectOption, userSelectData } from './UsersAdd.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const UsersAdd = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const methods = useForm();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
      </Box>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <Box>
          {' '}
          <DialogTitle>Add User</DialogTitle>
        </Box>
        <DialogContent>
          <Box>
            <UserSearchableSelect
              name="selectedOption"
              options={userSelectOption}
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
              options={userSelectData}
              placeholder="Select Contract"
              showSearchBar={false}
              label="Contract"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              enqueueSnackbar('Add successfully', {
                variant: 'success',
                autoHideDuration: 2000,
              });
              setModalOpen(false);
            }}
            color="primary"
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
