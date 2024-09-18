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
import { useAddToDashboardReport } from './useAddToDashboardReport';
import CloseIcon from '@mui/icons-material/Close';
import { DashboardNameFieldDropdown } from '../ReportFormFields/DashboardNameFieldDropdown';

export const AddToDashboardReport = () => {
  const {
    methods,
    handleSubmit,
    submitAddToDashboardForm,
    closeModal,
    addReportsToDashboardStatus,
    isPortalOpen,
  }: any = useAddToDashboardReport();

  return (
    <Dialog
      open={isPortalOpen?.isOpen as boolean}
      onClose={closeModal}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitAddToDashboardForm)}
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
              Select Dashboard
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={closeModal}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <DashboardNameFieldDropdown />
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            className="small"
            variant="outlined"
            color="secondary"
            onClick={closeModal}
            disabled={addReportsToDashboardStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            className="small"
            variant="contained"
            type="submit"
            loading={addReportsToDashboardStatus?.isLoading}
            disabled={addReportsToDashboardStatus?.isLoading}
          >
            Apply
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
