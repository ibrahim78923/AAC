import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useUsersAdd from './useUsersAdd';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '@/components/ReactHookForm';
import { PlusSharedColorIcon } from '@/assets/icons';

export const UsersAdd = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
    isModalOpen,
    addUserDataFormFieldsAddUser,
    isLoading,
  } = useUsersAdd();
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={openModal}
              startIcon={<PlusSharedColorIcon />}
              color="primary"
              variant="contained"
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
            <Typography variant={'pageTitle'}>Add User</Typography>
            <CloseIcon onClick={closeModal} sx={{ cursor: 'pointer' }} />
          </DialogTitle>
        </Box>
        <DialogContent>
          <Grid container spacing={2}>
            {addUserDataFormFieldsAddUser?.map((item) => (
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
            disabled={isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant={'contained'}
            loading={isLoading}
            disabled={isLoading}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
