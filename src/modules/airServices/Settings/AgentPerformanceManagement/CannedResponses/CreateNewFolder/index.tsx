import { FormProvider } from '@/components/ReactHookForm';
import { useCreateNewFolder } from './useCreateNewFolder';
import { createNewFolderArray } from './CreateNewFolder.data';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ICannedResponsesProps } from '../CannedResponses.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export const CreateNewFolder = (props: ICannedResponsesProps) => {
  const { isPortalOpen } = props;
  const { methods, handleSubmit, onSubmit, apiCallInProgress, closeModal } =
    useCreateNewFolder(props);

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.create}
      closePortal={closeModal}
      dialogTitle={`${
        isPortalOpen?.editData
          ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
          : GENERIC_UPSERT_FORM_CONSTANT?.CREATE
      } Folder`}
      submitButtonText={
        isPortalOpen?.editData
          ? GENERIC_UPSERT_FORM_CONSTANT?.APPLY
          : GENERIC_UPSERT_FORM_CONSTANT?.SUBMIT
      }
      showSubmitLoader={apiCallInProgress}
      disabledCancelButton={apiCallInProgress}
      handleSubmitButton={handleSubmit(onSubmit)}
      maxWidth={'sm'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormGrid formFieldsList={createNewFolderArray} />;
      </FormProvider>
    </CustomCommonDialog>
  );
};
