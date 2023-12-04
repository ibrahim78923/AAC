import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { CloseModalIcon } from '@/assets/icons';
import { useMoveFolderModal } from './useMoveFolderModal';
import { moveFolderOptions } from './MoveFolderModal.data';
import { LoadingButton } from '@mui/lab';

export const MoveFolderModal = ({
  openMoveFolderModal,
  closeMoveFolderModal,
}: any) => {
  const { method, onSubmit } = useMoveFolderModal();
  return (
    <>
      {openMoveFolderModal && (
        <Dialog
          open={openMoveFolderModal}
          onClose={closeMoveFolderModal}
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
                  <RHFAutocomplete
                    name="folderName"
                    label="Folder Name"
                    size="small"
                    options={moveFolderOptions}
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </FormProvider>
          <DialogActions sx={{ pt: '0 !important' }}>
            <Box
              pt="0 !important"
              display="flex"
              justifyContent="flex-end"
              gap={2}
            >
              <LoadingButton
                onClick={closeMoveFolderModal}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                type="submit"
                variant="contained"
                onClick={method.handleSubmit(onSubmit)}
              >
                Move
              </LoadingButton>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
