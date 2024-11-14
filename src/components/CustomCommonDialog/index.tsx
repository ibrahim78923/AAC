import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export const CustomCommonDialog = (props: any) => {
  const {
    isPortalOpen = false,
    closePortal,
    dialogTitle = '',
    children,
    disabledCancelButton = false,
    showSubmitLoader = false,
    handleSubmitButton,
    handleCancelButton = closePortal,
    cancelButtonText = 'Cancel',
    submitButtonText = 'Submit',
    showActionButtons = true,
    dialogMaxWidth = 'sm',
    typeImage,
    disabledSubmitButton = showSubmitLoader,
  } = props;

  return (
    <Dialog
      open={isPortalOpen}
      onClose={closePortal}
      maxWidth={dialogMaxWidth}
      fullWidth
    >
      <DialogTitle>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
          mb={1.5}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            flex={1}
            gap={1}
            flexWrap={'wrap'}
          >
            {!!typeImage && <Box>{typeImage}</Box>}
            <Typography
              variant="h4"
              color="slateBlue.main"
              textTransform={'capitalize'}
            >
              {dialogTitle}
            </Typography>
          </Box>
          <Close
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={closePortal}
          />
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {showActionButtons && (
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            className="small"
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleCancelButton}
            disabled={disabledCancelButton}
          >
            {cancelButtonText}
          </LoadingButton>
          <LoadingButton
            className="small"
            type="submit"
            variant="contained"
            onClick={handleSubmitButton}
            loading={showSubmitLoader}
            disabled={disabledSubmitButton}
          >
            {submitButtonText}
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
};
