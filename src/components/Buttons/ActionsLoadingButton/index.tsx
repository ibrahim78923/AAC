import { Box } from '@mui/material';
import { CustomLoadingButton } from '../CustomLoadingButton';
import { ActionsLoadingButtonPropsI } from '../Buttons.interface';

export const ActionsLoadingButton = (props: ActionsLoadingButtonPropsI) => {
  const {
    handleSubmitButton,
    handleCancelButton,
    cancelButtonText = 'Cancel',
    submitButtonText = 'Submit',
    showSubmitLoader = false,
    disabledSubmitButton = showSubmitLoader,
    disabledCancelButton = showSubmitLoader,
    hasBorder = true,
    justifyContent = 'flex-end',
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent,
        gap: 1,
        py: 2,
        mt: 2,
        borderTop: hasBorder ? '1px solid' : 'none',
        borderColor: 'custom.off_white_three',
      }}
    >
      <CustomLoadingButton
        primary={false}
        onClick={handleCancelButton}
        disabled={disabledCancelButton}
      >
        {cancelButtonText}
      </CustomLoadingButton>

      <CustomLoadingButton
        type="submit"
        loading={showSubmitLoader}
        disabled={disabledSubmitButton}
        onClick={handleSubmitButton}
      >
        {submitButtonText}
      </CustomLoadingButton>
    </Box>
  );
};
