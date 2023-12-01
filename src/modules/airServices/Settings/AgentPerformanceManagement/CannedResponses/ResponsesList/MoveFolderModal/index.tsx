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
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { CloseModalIcon } from '@/assets/icons';
import { useMoveFolderModal } from './useMoveFolderModal';
import { moveFolderOptions } from './MoveFolderModal.data';
import { styles } from './MoveFolderModal.styles';

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
          PaperProps={styles?.paperProps}
        >
          <FormProvider
            methods={method}
            onSubmit={method?.handleSubmit(onSubmit)}
          >
            <DialogTitle sx={styles?.titleContainer}>
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
            <Box sx={styles?.actionsContainer}>
              <Button
                onClick={closeMoveFolderModal}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={method.handleSubmit(onSubmit)}
              >
                Move
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
