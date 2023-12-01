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
import { FormProvider } from '@/components/ReactHookForm';
import { CloseModalIcon } from '@/assets/icons';
import { useCreateNewFolder } from './useCreateNewFolder';
import { createNewFolderArray } from './CreateNewFolder.data';

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
                {createNewFolderArray?.map((item) => (
                  <Grid key={item?.id} item xs={12}>
                    <item.component {...item?.componentProps} />
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
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
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};
