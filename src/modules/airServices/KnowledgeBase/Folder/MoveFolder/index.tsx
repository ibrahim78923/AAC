import { FormProvider } from '@/components/ReactHookForm';
import { useMoveFolder } from './useMoveFolder';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export const MoveFolder = () => {
  const {
    methods,
    submitMoveFolder,
    handleSubmit,
    closeMoveFolderModal,
    moveFolderFormFields,
    isPortalOpen,
    apiCallInProgress,
  } = useMoveFolder();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeMoveFolderModal}
      dialogTitle="Move to other folder"
      submitButtonText="Move"
      showSubmitLoader={apiCallInProgress}
      disabledCancelButton={apiCallInProgress}
      handleSubmitButton={handleSubmit(submitMoveFolder)}
    >
      <FormProvider methods={methods}>
        <FormGrid spacing={1} formFieldsList={moveFolderFormFields} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
