import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useChangeReportOwner } from './useChangeReportOwner';
import CloseIcon from '@mui/icons-material/Close';
import { ReportOwnerFieldDropdown } from '../ReportFormFields/ReportOwnerFieldDropdown';

export const ChangeReportOwner = () => {
  const {
    methods,
    handleSubmit,
    submitChangeOwner,
    closeModal,
    changeReportOwnerStatus,
    isPortalOpen,
  } = useChangeReportOwner();

  return (
    <Dialog
      open={isPortalOpen?.isOpen as boolean}
      onClose={closeModal}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitChangeOwner)}
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
            <Typography variant="h4" color="slateBlue.main">
              Change Owner
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={closeModal}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <ReportOwnerFieldDropdown />
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            className="small"
            variant="outlined"
            color="secondary"
            onClick={closeModal}
            disabled={changeReportOwnerStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            className="small"
            variant="contained"
            type="submit"
            loading={changeReportOwnerStatus?.isLoading}
            disabled={changeReportOwnerStatus?.isLoading}
          >
            Apply
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
