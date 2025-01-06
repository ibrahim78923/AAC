import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useCreateNewFolder } from './useCreateNewFolder';
import { createNewFolderArray } from './CreateNewFolder.data';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ICannedResponsesProps } from '../CannedResponses.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
        <Grid container spacing={1.4}>
          {createNewFolderArray?.map((item: any) => (
            <Grid key={item?.id} item xs={12}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
};
