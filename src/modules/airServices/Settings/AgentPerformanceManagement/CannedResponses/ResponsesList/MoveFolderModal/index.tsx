import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { CloseModalIcon } from '@/assets/icons';
import { useMoveFolderModal } from './useMoveFolderModal';
import { LoadingButton } from '@mui/lab';

export const MoveFolderModal = (props: any) => {
  const {
    method,
    onSubmit,
    openMoveFolderModal,
    closeMoveFolderModal,
    apiQueryFolders,
    isLoading,
  } = useMoveFolderModal(props);
  return (
    <>
      {openMoveFolderModal && (
        <Dialog
          open={openMoveFolderModal}
          onClose={() => {
            closeMoveFolderModal();
            method?.reset();
          }}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              width: 468,
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
              pb={2.4}
            >
              <Typography variant="h3">Move</Typography>
              <Box onClick={closeMoveFolderModal} sx={{ cursor: 'pointer' }}>
                <CloseModalIcon />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container gap={1.4}>
                <Grid item xs={12}>
                  <RHFAutocompleteAsync
                    name="folder"
                    label="Folder Name"
                    size="small"
                    placeholder="select"
                    apiQuery={apiQueryFolders}
                    getOptionLabel={(option: any) => option?.folderName}
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ pt: '0 !important' }}>
              <Box
                pt="0 !important"
                display="flex"
                justifyContent="flex-end"
                gap={2}
              >
                <LoadingButton
                  onClick={() => {
                    closeMoveFolderModal();
                    method?.reset();
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  variant="contained"
                >
                  Move
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};
