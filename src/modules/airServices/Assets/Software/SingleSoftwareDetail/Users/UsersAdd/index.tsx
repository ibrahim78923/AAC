import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useUsersAdd from './useUsersAdd';
import { FormProvider } from '@/components/ReactHookForm';
import { PlusSharedColorIcon } from '@/assets/icons';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
    <FormProvider methods={methods}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={openModal}
              startIcon={<PlusSharedColorIcon />}
              color="primary"
              variant="contained"
              className="small"
            >
              Add User
            </Button>
          </Grid>
        </Grid>
      </Box>
      <CustomCommonDialog
        isPortalOpen={isModalOpen}
        closePortal={closeModal}
        dialogTitle="Add User"
        submitButtonText="Add"
        showSubmitLoader={isLoading}
        disabledCancelButton={isLoading}
        handleSubmitButton={handleSubmit(onSubmit)}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {addUserDataFormFieldsAddUser?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CustomCommonDialog>
    </FormProvider>
  );
};
