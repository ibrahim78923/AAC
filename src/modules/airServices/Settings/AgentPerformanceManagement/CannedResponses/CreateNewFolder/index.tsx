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
          PaperProps={{
            style: {
              maxWidth: 736,
              borderRadius: 12,
            },
          }}
        >
          <FormProvider
            methods={method}
            onSubmit={method?.handleSubmit(onSubmit)}
          >
            <DialogTitle
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingBottom={2.4}
            >
              <Typography variant="h4" color="primary?.main">
                {openCreateNewFolderModal?.editData
                  ? 'Edit Folder'
                  : 'Create New Folder'}
              </Typography>
              <Box
                onClick={closeCreateNewFolderModal}
                sx={{
                  cursor: 'pointer',
                }}
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
            <Box display="flex" justifyContent="flex-end" gap={2}>
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
