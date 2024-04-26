import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Dialog, Grid, IconButton, Typography } from '@mui/material';
import { useReportAnIssueModal } from './useReportAnIssueModal';
import { reportAnIssueModalFormFields } from './ReportAnIssueModal.data';
import { LoadingButton } from '@mui/lab';

const ReportAnIssueModal = (props: any) => {
  const { openReportAnIssueModal, setOpenReportAnIssueModal } = props;
  const {
    methods,
    handleSubmitIssue,
    isLoading,
    apiQueryAssociateAsset,
    apiQueryRequester,
  } = useReportAnIssueModal(props);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={openReportAnIssueModal}
        onClose={() => setOpenReportAnIssueModal?.(false)}
      >
        <FormProvider methods={methods} onSubmit={handleSubmitIssue}>
          <Box p={2}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={1}
            >
              <Typography variant="h3">Report an issue</Typography>
              <IconButton sx={{ cursor: 'pointer' }}>
                <AlertModalCloseIcon
                  onClick={() => setOpenReportAnIssueModal?.(false)}
                />
              </IconButton>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {reportAnIssueModalFormFields(
                  apiQueryAssociateAsset,
                  apiQueryRequester,
                )?.map((item: any) => (
                  <item.component
                    {...item?.componentProps}
                    key={item?.id}
                    size="small"
                  />
                ))}
              </Grid>
            </Grid>
            <Box
              display={'flex'}
              justifyContent={'flex-end'}
              alignItems={'center'}
              gap={1}
              mt={'0.625rem'}
            >
              <LoadingButton
                variant="outlined"
                color="secondary"
                onClick={() => setOpenReportAnIssueModal?.(false)}
                disabled={isLoading}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                type="submit"
                disabled={isLoading}
                loading={isLoading}
              >
                Submit
              </LoadingButton>
            </Box>
          </Box>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default ReportAnIssueModal;
