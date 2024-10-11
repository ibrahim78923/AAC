import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useCreateNewFolder } from './useCreateNewFolder';
import { createNewFolderArray } from './CreateNewFolder.data';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ICannedResponsesProps } from '../CannedResponses.interface';

export const CreateNewFolder = (props: ICannedResponsesProps) => {
  const {
    method,
    handleSubmit,
    onSubmit,
    openCreateNewFolderModal,
    closeCreateNewFolderModal,
    postCannedResponseStatus,
    patchCannedResponseStatus,
  } = useCreateNewFolder(props);

  return (
    <Dialog
      open={openCreateNewFolderModal?.create}
      onClose={closeCreateNewFolderModal}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
        >
          <Typography variant="h4" color="slateBlue.main">
            {`${
              openCreateNewFolderModal?.editData
                ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
                : GENERIC_UPSERT_FORM_CONSTANT?.CREATE
            } Folder`}
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => closeCreateNewFolderModal?.()}
          />
        </Box>
      </DialogTitle>

      <DialogContent>
        <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1.4}>
            {createNewFolderArray?.map((item: any) => (
              <Grid key={item?.id} item xs={12}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </DialogContent>

      <DialogActions sx={{ paddingTop: `0rem !important` }}>
        <LoadingButton
          onClick={closeCreateNewFolderModal}
          variant="outlined"
          color="secondary"
          className={'small'}
          disabled={
            postCannedResponseStatus?.isLoading ||
            patchCannedResponseStatus?.isLoading
          }
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          type="submit"
          loading={
            postCannedResponseStatus?.isLoading ||
            patchCannedResponseStatus?.isLoading
          }
          variant="contained"
          color="primary"
          className={'small'}
          onClick={handleSubmit(onSubmit)}
        >
          {openCreateNewFolderModal?.editData
            ? GENERIC_UPSERT_FORM_CONSTANT?.APPLY
            : GENERIC_UPSERT_FORM_CONSTANT?.SUBMIT}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
