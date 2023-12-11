import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormProvider, useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { enqueueSnackbar } from 'notistack';
import { userSelectOption, userSelectData } from './UsersAdd.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RHFAutocomplete } from '@/components/ReactHookForm';

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

      <Dialog open={isModalOpen} onClose={closeModal} maxWidth={'sm'} fullWidth>
        <Box>
          <DialogTitle
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant={'h4'}>Add User</Typography>
            <CloseIcon onClick={closeModal} sx={{ cursor: 'pointer' }} />
          </DialogTitle>
        </Box>
        <DialogContent>
          <RHFAutocomplete
            name="selectedUser"
            options={userSelectOption}
            placeholder="Select User"
            label="User"
            required
          />

          <RHFAutocomplete
            name="selectedContract"
            options={userSelectData}
            placeholder="Select Contract"
            label="Contract"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary" variant={'outlined'}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              enqueueSnackbar('Add successfully', {
                variant: 'success',
              });
              setModalOpen(false);
            }}
            color="primary"
            variant={'contained'}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
