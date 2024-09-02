import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ReportIssuePropsI } from './ReportIssue.interface';
import { useReportIssue } from './useReportIssue';
import CloseIcon from '@mui/icons-material/Close';

export const ReportIssue = (props: ReportIssuePropsI) => {
  const { isPortalOpen } = props;
  const {
    methods,
    postReportAnIssueStatus,
    closePortal,
    handleSubmit,
    onSubmit,
    reportIssueFormFields,
  } = useReportIssue(props);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={isPortalOpen}
        onClose={() => closePortal?.()}
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
              Report an issue
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => closePortal?.()}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {reportIssueFormFields?.map((item: any) => (
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
                onClick={() => closePortal?.()}
                disabled={postReportAnIssueStatus?.isLoading}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                type="submit"
                disabled={postReportAnIssueStatus?.isLoading}
                loading={postReportAnIssueStatus?.isLoading}
              >
                Submit
              </LoadingButton>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};
