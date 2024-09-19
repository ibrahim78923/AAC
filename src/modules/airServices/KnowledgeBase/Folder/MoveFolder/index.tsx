import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useMoveFolder } from './useMoveFolder';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const MoveFolder = () => {
  const {
    methods,
    submitMoveFolder,
    patchArticleStatus,
    handleSubmit,
    closeMoveFolderModal,
    moveFolderFormFields,
    isPortalOpen,
  } = useMoveFolder();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeMoveFolderModal}
      dialogTitle="Move to other folder"
      submitButtonText="Move"
      showSubmitLoader={patchArticleStatus?.isLoading}
      disabledCancelButton={patchArticleStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitMoveFolder)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {moveFolderFormFields?.map((item: ReactHookFormFieldsI) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
};
