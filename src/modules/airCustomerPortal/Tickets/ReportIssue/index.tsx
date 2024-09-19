import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ReportIssuePropsI } from './ReportIssue.interface';
import { useReportIssue } from './useReportIssue';
import CloseIcon from '@mui/icons-material/Close';
import { PORTAL_TICKET_FIELDS } from '@/constants/strings';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';

export const ReportIssue = (props: ReportIssuePropsI) => {
  const { isPortalOpen } = props;
  const {
    methods,
    postReportAnIssueStatus,
    closePortal,
    handleSubmit,
    onSubmit,
    reportIssueFormFields,
    getArticleStatus,
    handleArticleClick,
    subjectValue,
    checkArticlePermission,
    portalStyles,
    requestorCondition,
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
                {reportIssueFormFields?.map((item) => {
                  if (requestorCondition(item))
                    return (
                      <>
                        <RHFTextField
                          name="requesterEmail"
                          label="Requester Email"
                          placeholder="Enter Requester Email"
                          size="small"
                          required
                        />
                        <RHFTextField
                          name="requesterName"
                          label="Requester Name"
                          placeholder="Enter Requester Name"
                          size="small"
                          required
                        />
                      </>
                    );
                  if (
                    !!checkArticlePermission &&
                    item?.componentProps?.name === PORTAL_TICKET_FIELDS?.SUBJECT
                  )
                    return (
                      <>
                        <item.component
                          {...item?.componentProps}
                          key={item?.id}
                          size="small"
                        />
                        {getArticleStatus?.isLoading ||
                        getArticleStatus?.isFetching ? (
                          <LinearProgress />
                        ) : !subjectValue?.trim() ? null : (
                          getArticleStatus?.data?.length > 0 &&
                          checkArticlePermission && (
                            <Box display="flex" gap={1} flexWrap="wrap">
                              {getArticleStatus?.data?.map(
                                (article: {
                                  _id: string;
                                  title: string;
                                  folderId: string;
                                }) => (
                                  <Chip
                                    key={article?._id}
                                    label={article?.title}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() =>
                                      handleArticleClick(
                                        article?._id,
                                        article?.folderId,
                                      )
                                    }
                                  />
                                ),
                              )}
                            </Box>
                          )
                        )}
                      </>
                    );
                  return (
                    <item.component
                      {...item?.componentProps}
                      key={item?.id}
                      size="small"
                    />
                  );
                })}
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
                className="small"
                onClick={() => closePortal?.()}
                disabled={postReportAnIssueStatus?.isLoading}
                sx={(theme) => ({
                  borderColor:
                    portalStyles?.btnSecondary ||
                    customizePortalDefaultValues(theme)?.btnSecondary,
                  color:
                    portalStyles?.btnSecondary ||
                    customizePortalDefaultValues(theme)?.btnSecondary,
                  '&:hover': {
                    borderColor:
                      portalStyles?.btnSecondary ||
                      customizePortalDefaultValues(theme)?.btnSecondary,
                    color:
                      portalStyles?.btnSecondary ||
                      customizePortalDefaultValues(theme)?.btnSecondary,
                  },
                })}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                className="small"
                sx={(theme) => ({
                  bgcolor:
                    portalStyles?.btnPrimary ||
                    customizePortalDefaultValues(theme)?.btnPrimary,
                  color: 'common.white',
                  '&:hover': {
                    bgcolor:
                      portalStyles?.btnPrimary ||
                      customizePortalDefaultValues(theme)?.btnPrimary,
                    color: 'common.white',
                  },
                  '&.Mui-disabled': {
                    bgcolor:
                      portalStyles?.btnPrimary ||
                      customizePortalDefaultValues(theme)?.btnPrimary,
                  },
                })}
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
