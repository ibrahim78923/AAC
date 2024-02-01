import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormProvider } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useUsersAdd from './useUsersAdd';
import { LoadingButton } from '@mui/lab';

export const UsersAdd = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
    isModalOpen,
    addUserDataFormFieldsAddUser,
  } = useUsersAdd();
  return (
    <FormProvider {...methods} onSubmit={handleSubmit(onSubmit)}>
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
          <Grid container spacing={2}>
            {addUserDataFormFieldsAddUser?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={closeModal}
            color="secondary"
            variant={'outlined'}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant={'contained'}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
