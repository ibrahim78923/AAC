import useUsersAdd from './useUsersAdd';
import { FormProvider } from '@/components/ReactHookForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

export const UsersAdd = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
    isModalOpen,
    addUserFormFields,
    isLoading,
  } = useUsersAdd();

  return (
    <FormProvider methods={methods}>
      <AddNewItemButton size="medium" name="Add User" onClick={openModal} />
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
          <FormGrid formFieldsList={addUserFormFields} />
        </FormProvider>
      </CustomCommonDialog>
    </FormProvider>
  );
};
