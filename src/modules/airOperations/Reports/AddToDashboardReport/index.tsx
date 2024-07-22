import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { PAGINATION } from '@/config';
import { useAddToDashboardReport } from './useAddToDashboardReport';
import CloseIcon from '@mui/icons-material/Close';

export const AddToDashboardReport = (props: any) => {
  const { isPortalOpen, baseModule } = props;
  const {
    methods,
    handleSubmit,
    submitAddToDashboardForm,
    closeModal,
    API_QUERY_DASHBOARD,
    apiQueryServicesDashboard,
    addReportsToDashboardStatus,
  }: any = useAddToDashboardReport(props);

  return (
    <Dialog
      open={isPortalOpen?.isAddedToDashboard}
      onClose={() => closeModal?.()}
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
              onClick={() => closeModal?.()}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <RHFAutocompleteAsync
            label=""
            name="dashboard"
            fullWidth
            required
            apiQuery={
              API_QUERY_DASHBOARD?.[baseModule] ?? apiQueryServicesDashboard
            }
            multiple
            size="small"
            placeholder="Search Here"
            externalParams={{
              limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
            }}
            getOptionLabel={(option: any) => `${option?.name}`}
          />
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeModal?.()}
            disabled={addReportsToDashboardStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
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
