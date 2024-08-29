import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { checkModalTypeForImage } from './AlertModals.data';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { AlertModalsPropsI } from './AlertModals.interface';

export const AlertModals = (props: AlertModalsPropsI) => {
  const {
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
    isDisableSubmitBtn = false,
    loading,
    footer = true,
  } = props;

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
            {typeImage ?? checkModalTypeForImage(type)}
            <Typography
              variant="h3"
              color="slateBlue.main"
              textTransform={'capitalize'}
            >
              {type}
            </Typography>
          </Box>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => handleClose?.()}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
          {message}{' '}
        </Typography>
      </DialogContent>
      {footer && (
        <DialogActions
          sx={{ '&.MuiDialogActions-root': { paddingTop: '0rem !important' } }}
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
            disabled={isDisableSubmitBtn}
            loading={loading}
          >
            {submitBtnText}
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
};
