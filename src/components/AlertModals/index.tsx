import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { checkModalTypeForImage } from './AlertModals.data';
import { AlertModalCloseIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';

export const AlertModals = ({
  message,
  type,
  open,
  handleClose,
  handleCancelBtn = handleClose,
  handleSubmitBtn,
  cancelBtnText = 'No',
  submitBtnText = 'Yes',
  typeImage,
  disableCancelBtn,
  loading,
  footer = true,
}: any) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
        >
          <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            {checkModalTypeForImage(type) ?? typeImage}
            <Typography variant="h3" textTransform={'capitalize'}>
              {type}
            </Typography>
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => handleClose?.()}>
            <AlertModalCloseIcon />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
          {message}{' '}
        </Typography>
      </DialogContent>
      {footer && (
        <DialogActions
          sx={{ '&.MuiDialogActions-root': { padding: '1.5rem !important' } }}
        >
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => handleCancelBtn?.()}
            disabled={disableCancelBtn}
          >
            {cancelBtnText}
          </LoadingButton>
          <LoadingButton
            variant="contained"
            onClick={handleSubmitBtn}
            loading={loading}
          >
            {submitBtnText}
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
};
