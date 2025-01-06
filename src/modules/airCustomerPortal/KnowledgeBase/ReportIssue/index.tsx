import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Chip, Grid, LinearProgress, Theme } from '@mui/material';
import { ReportIssuePropsI } from './ReportIssue.interface';
import { useReportIssue } from './useReportIssue';
import { PORTAL_TICKET_FIELDS } from '@/constants/strings';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
      <CustomCommonDialog
        isPortalOpen={isPortalOpen}
        closePortal={() => closePortal?.()}
        handleSubmitButton={handleSubmit(onSubmit)}
        showSubmitLoader={postReportAnIssueStatus?.isLoading}
        disabledCancelButton={postReportAnIssueStatus?.isLoading}
        dialogTitle="Report an issue"
        cancelButtonStyles={(theme: Theme) => ({
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
        submitButtonStyles={(theme: Theme) => ({
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
      >
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
                        name="name"
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
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
