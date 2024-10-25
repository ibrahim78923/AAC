import { Typography } from '@mui/material';
import { checkModalTypeForImage } from './AlertModals.data';
import { AlertModalsPropsI } from './AlertModals.interface';
import { CustomCommonDialog } from '../CustomCommonDialog';

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
    <CustomCommonDialog
      typeImage={typeImage ?? checkModalTypeForImage(type)}
      isPortalOpen={open}
      closePortal={handleClose}
      dialogTitle={type}
      submitButtonText={submitBtnText}
      showSubmitLoader={loading}
      disabledCancelButton={disableCancelBtn}
      handleSubmitButton={handleSubmitBtn}
      cancelButtonText={cancelBtnText}
      disabledSubmitButton={isDisableSubmitBtn}
      showActionButtons={footer}
      handleCancelBtn={handleCancelBtn}
    >
      <Typography variant="body1" color="slateBlue.main">
        {message}
      </Typography>
    </CustomCommonDialog>
  );
};
