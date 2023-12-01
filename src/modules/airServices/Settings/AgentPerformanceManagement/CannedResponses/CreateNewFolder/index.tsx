import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { CloseModalIcon } from '@/assets/icons';
import { useCreateNewFolder } from './useCreateNewFolder';
import { styles } from './CreateNewFolder.styles';

export const CreateNewFolder = ({
  openCreateNewFolderModal,
  closeCreateNewFolderModal,
}: any) => {
  const { method, onSubmit } = useCreateNewFolder(openCreateNewFolderModal);
  return (
    <>
      {openCreateNewFolderModal?.open && (
        <Dialog
          open={openCreateNewFolderModal?.open}
          onClose={closeCreateNewFolderModal}
          aria-labelledby="responsive-dialog-title"
          PaperProps={styles?.paperProps}
        >
          <FormProvider
            methods={method}
            onSubmit={method?.handleSubmit(onSubmit)}
          >
            <DialogTitle sx={styles?.dialogTitleContainer}>
              <Typography variant="h4" color="primary?.main">
                {openCreateNewFolderModal?.editData
                  ? 'Edit Folder'
                  : 'Create New Folder'}
              </Typography>
              <Box
                onClick={closeCreateNewFolderModal}
                sx={styles?.closeModalIconBox}
              >
                <CloseModalIcon />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container gap={1.4}>
                <Grid item xs={12}>
                  <RHFTextField
                    name="folderName"
                    label="Folder Name"
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="description"
                    label="Description"
                    size="small"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </FormProvider>
          <DialogActions>
            <Box sx={styles?.dialogActionsBox}>
              <Button
                onClick={closeCreateNewFolderModal}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={method?.handleSubmit(onSubmit)}
              >
                {openCreateNewFolderModal?.editData ? 'Apply' : 'Submit'}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
