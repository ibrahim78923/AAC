import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModalCloseIcon } from '@/assets/icons';
import { moveFolderFields } from './MoveFolderModal.data';
import { useMoveFolderModal } from './useMoveFolderModal';

export const MoveFolderModal = ({
  moveFolderModal,
  setMoveFolderModal,
}: any) => {
  const { methodMoveFolderForm, submitMoveFolder } =
    useMoveFolderModal(setMoveFolderModal);
  return (
    <Dialog
      open={moveFolderModal}
      onClose={() => setMoveFolderModal(false)}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap={'wrap'}
        >
          <Typography variant="h3" color="slateBlue.main">
            Move to other folder
          </Typography>
          <AlertModalCloseIcon
            onClick={() => setMoveFolderModal(false)}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <FormProvider
        methods={methodMoveFolderForm}
        onSubmit={methodMoveFolderForm?.handleSubmit(submitMoveFolder)}
      >
        <DialogContent>
          <Grid container spacing={1}>
            {moveFolderFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?._id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => setMoveFolderModal(false)}
            type="button"
          >
            Cancel
          </LoadingButton>
          <LoadingButton variant="contained" type="submit">
            Move
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
