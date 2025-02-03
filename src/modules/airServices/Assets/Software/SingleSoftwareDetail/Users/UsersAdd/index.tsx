import { useUsersAdd } from './useUsersAdd';
import { FormProvider } from '@/components/ReactHookForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UsersAdd = (props: any) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    onSubmit,
    addUserFormFields,
    isLoading,
    closeModal,
  } = useUsersAdd(props);

  return (
    <FormProvider methods={methods}>
      <CustomCommonDialog
        isPortalOpen={isPortalOpen?.isOpen}
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
