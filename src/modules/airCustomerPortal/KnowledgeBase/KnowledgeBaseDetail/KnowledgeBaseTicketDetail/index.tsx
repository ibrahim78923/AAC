import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useKnowledgeBaseTicketDetail } from './useKnowledgeBaseTicketDetail';
import { DocumentTextIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '@/components/ReactHookForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS } from '@/constants/permission-keys';

export const KnowledgeBaseTicketDetail = () => {
  const {
    theme,
    handlePageBack,
    showFeedbackField,
    setShowFeedbackField,
    feedbackDataArray,
    feedbackSubmit,
    feedbackMethod,
    showOkFeedback,
    helpfulSubmit,
    singleArticlesData,
    isLoading,
    relatedArticlesData,
    loadingArticles,
    handleRelatedArticles,
    singleArticleId,
    feedbackIsLoading,
    isFetching,
    fetchingArticles,
  } = useKnowledgeBaseTicketDetail();
  return (
    <PermissionsGuard
      permissions={[
        AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS?.VIEW_ARTICLES_DIFFERENT_CATEGORY,
      ]}
    >
      <Grid container spacing={1} justifyContent={'space-between'}>
        <Grid item xs={12} lg={8.9}>
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2.5}
            gap={1.4}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ cursor: 'pointer' }}
            >
              <ArrowBackIcon onClick={handlePageBack} />
            </Box>
            <Typography variant="h3" color={theme?.palette?.slateBlue?.main}>
              {singleArticlesData?.title}
            </Typography>
          </Box>
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : (
            <Box
              dangerouslySetInnerHTML={{ __html: singleArticlesData?.details }}
            ></Box>
          )}
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            borderLeft={{
              lg: `.1rem solid ${theme?.palette?.grey?.[700]}`,
              xs: null,
            }}
            borderTop={{
              lg: null,
              xs: `.1rem solid ${theme?.palette?.grey?.[700]}`,
            }}
            height={'100%'}
            pl={{ lg: 2, xs: 0 }}
          >
            <Grid container flexDirection={'column'} spacing={1.5} mt={1}>
              {!showOkFeedback && !showFeedbackField && (
                <Typography color="secondary" variant="body2">
                  Was this answer helpful??
                </Typography>
              )}
              <Grid item>
                <Typography variant="h4">Related Articles</Typography>
                <Box
                  height={showFeedbackField ? '14rem' : '33rem'}
                  overflow={'scroll'}
                >
                  {loadingArticles || fetchingArticles ? (
                    <SkeletonTable />
                  ) : (
                    <>
                      {relatedArticlesData?.map(
                        (item: any) =>
                          item?._id != singleArticleId && (
                            <Box
                              display={'flex'}
                              justifyContent={'flex-start'}
                              alignItems={'center'}
                              p={1}
                              borderRadius={1}
                              bgcolor={theme?.palette?.grey?.[100]}
                              mt={0.5}
                              key={item?.id}
                              onClick={() => handleRelatedArticles(item?._id)}
                              sx={{ cursor: 'pointer' }}
                            >
                              <DocumentTextIcon />
                              <Typography color="secondary">
                                {item?.title}
                              </Typography>
                            </Box>
                          ),
                      )}
                    </>
                  )}
                </Box>
              </Grid>
              {showFeedbackField ? (
                <Box display={'flex'} flexDirection={'column'} p={1}>
                  <Typography color="secondary" variant="body2" mb={1}>
                    Sorry we cannot be helpful. Help us improve this article
                    with your feedback.
                  </Typography>
                  <Typography variant="h6">
                    Your Feedback{' '}
                    <Box component="span" color="red">
                      *
                    </Box>
                  </Typography>
                  <FormProvider
                    methods={feedbackMethod}
                    onSubmit={feedbackSubmit}
                  >
                    <Grid container>
                      {feedbackDataArray?.map((item: any) => (
                        <Grid item key={item?.id} xs={12}>
                          <item.component {...item?.componentProps} />
                        </Grid>
                      ))}
                    </Grid>
                    <Box
                      display={'flex'}
                      justifyContent={'flex-end'}
                      gap={1}
                      mt={1}
                    >
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setShowFeedbackField(false)}
                      >
                        Cancel
                      </Button>
                      <LoadingButton
                        loading={feedbackIsLoading}
                        variant="contained"
                        type="submit"
                      >
                        Submit
                      </LoadingButton>
                    </Box>
                  </FormProvider>
                </Box>
              ) : (
                <>
                  {!showOkFeedback && (
                    <Typography
                      color="secondary"
                      variant="body2"
                      display={'flex'}
                      justifyContent={'center'}
                    >
                      Was this answer helpful??
                    </Typography>
                  )}
                </>
              )}
              {showOkFeedback && (
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={0.5}
                >
                  <CheckCircleIcon sx={{ color: 'success.main' }} />
                  <Typography color="secondary" variant="body2">
                    Glad we could be helpful. Thanks for the feedback.
                  </Typography>
                </Box>
              )}
              <Divider sx={{ mt: 2 }} />
              {!showOkFeedback && !showFeedbackField && (
                <Grid item display={'flex'} justifyContent={'flex-end'} gap={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowFeedbackField(true)}
                  >
                    No
                  </Button>
                  <LoadingButton
                    loading={feedbackIsLoading}
                    variant="contained"
                    onClick={helpfulSubmit}
                  >
                    Yes
                  </LoadingButton>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PermissionsGuard>
  );
};
