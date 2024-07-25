import {
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useKnowledgeBaseTicketDetail } from './useKnowledgeBaseTicketDetail';
import { DocumentTextIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '@/components/ReactHookForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS } from '@/constants/permission-keys';
import NoData from '@/components/NoData';
import { PageTitledHeader } from '@/components/PageTitledHeader';

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
          <PageTitledHeader
            title={
              isLoading || isFetching ? (
                <Skeleton variant="rectangular" width={'10rem'} />
              ) : (
                singleArticlesData?.title
              )
            }
            canMovedBack
            moveBack={handlePageBack}
          />
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : (
            <Box
              height={'45rem'}
              overflow={'scroll'}
              dangerouslySetInnerHTML={{ __html: singleArticlesData?.details }}
            />
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
            borderBottom={{
              lg: null,
              xs: `.1rem solid ${theme?.palette?.grey?.[700]}`,
            }}
            height={'100%'}
            pl={{ lg: 2, xs: 0 }}
          >
            <Grid container flexDirection={'column'} mt={1}>
              <Grid item>
                <Typography variant="h4">Related Articles</Typography>
                <Box
                  height={showFeedbackField ? '14rem' : '37rem'}
                  overflow={'scroll'}
                >
                  {loadingArticles || fetchingArticles ? (
                    <SkeletonTable />
                  ) : (
                    <>
                      {relatedArticlesData?.length > 1 ? (
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
                                  onClick={() =>
                                    handleRelatedArticles(item?._id)
                                  }
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
                      ) : (
                        <NoData message="No related articles found" />
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
                      mt={3}
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
                  mt={6}
                >
                  <CheckCircleIcon sx={{ color: 'success.main' }} />
                  <Typography color="secondary" variant="body2">
                    Glad we could be helpful. Thanks for the feedback.
                  </Typography>
                </Box>
              )}
              {!showOkFeedback && !showFeedbackField && (
                <>
                  <Divider sx={{ m: 1.5 }} />
                  <Grid
                    item
                    display={'flex'}
                    justifyContent={'flex-end'}
                    gap={1}
                    mb={2}
                  >
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
                </>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PermissionsGuard>
  );
};
