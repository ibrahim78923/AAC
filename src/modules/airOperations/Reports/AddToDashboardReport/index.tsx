import { AlertModalCloseIcon } from '@/assets/icons';
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

export const AddToDashboardReport = (props: any) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    submitAddToDashboardForm,
    closeModal,
    apiQueryDashboard,
  }: any = useAddToDashboardReport(props);

  return (
    <Dialog
      open={isPortalOpen?.AddedToDashboard}
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
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <Typography variant="h3" textTransform={'capitalize'}>
                Select Dashboard
              </Typography>
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={() => closeModal?.()}>
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <RHFAutocompleteAsync
            label="Select Dashboard"
            name="dashboard"
            fullWidth
            required
            apiQuery={apiQueryDashboard}
            multiple
            size="small"
            placeholder="Select Dashboard"
            externalParams={{
              limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
            }}
            getOptionLabel={(option: any) => `${option?.name}`}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeModal?.()}
            disabled
          >
            Cancel
          </LoadingButton>
          <LoadingButton variant="contained" type="submit" loading={false}>
            Apply
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
