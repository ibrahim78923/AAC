import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertDataArray } from './UpsertFolder.data';
import { AlertModalCloseIcon } from '@/assets/icons';
import { useUpsertFolder } from './useUpsertFolder';
import { LoadingButton } from '@mui/lab';

export const UpsertFolder = (props: any) => {
  const { openDialog, setOpenDialog } = props;
  const {
    methods,
    handleSubmit,
    onSubmit,
    postFolderStatus,
    closeUpsetFolderModal,
  } = useUpsertFolder(props);

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={'1rem'}
        >
          <Typography variant="h5">Create Folder</Typography>
          <AlertModalCloseIcon
            onClick={() => {
              setOpenDialog(false);
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {upsertDataArray?.map((item: any) => (
            <item.component
              {...item?.componentProps}
              key={item?.id}
              size={'small'}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            marginBottom={'2rem'}
            gap={'1rem'}
          >
            <LoadingButton
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => closeUpsetFolderModal?.()}
              disabled={postFolderStatus?.isLoading}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={postFolderStatus?.isLoading}
            >
              Create
            </LoadingButton>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
