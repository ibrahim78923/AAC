import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useMoveFolderModal } from './useMoveFolderModal';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const MoveFolderModal = (props: any) => {
  const { isPortalOpen } = props;

  const {
    methods,
    onSubmit,
    closeModal,
    apiQueryFolders,
    isLoading,
    handleSubmit,
  } = useMoveFolderModal(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={isPortalOpen?.isOpen}
        closePortal={closeModal}
        dialogTitle="Move"
        submitButtonText="Move"
        showSubmitLoader={isLoading}
        disabledCancelButton={isLoading}
        handleSubmitButton={handleSubmit(onSubmit)}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFAutocompleteAsync
            name="folder"
            label="Folder Name"
            size="small"
            placeholder="Select Folder"
            apiQuery={apiQueryFolders}
            getOptionLabel={(option: any) => option?.folderName}
            required
            fullWidth
          />
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
