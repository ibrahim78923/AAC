import { DocumentTextIcon } from '@/assets/icons';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, Grid, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormProvider } from '@/components/ReactHookForm';
import { truncateText } from '@/utils/avatarUtils';

export const KnowledgeBaseRelatedArticles = (props: any) => {
  const {
    loadingArticles,
    fetchingArticles,
    relatedArticlesData,
    handleRelatedArticles,
    singleArticleId,
    theme,
    showFeedbackField,
    feedbackMethod,
    feedbackSubmit,
    feedbackDataArray,
    showOkFeedback,
    feedbackIsLoading,
    helpfulSubmit,
    setShowFeedbackField,
    companyId,
  } = props;

  if (loadingArticles || fetchingArticles) return <SkeletonTable />;

  return (
    <Box display={'flex'} flexDirection={'column'} height={'100%'}>
      <Typography variant="h4">Related Articles</Typography>
      <Box
        height={showFeedbackField ? (companyId ? '4rem' : '9rem') : '32rem'}
        overflow="scroll"
        flexGrow={1}
      >
        {relatedArticlesData?.length <= 1 ? (
          <NoData message="No related articles found" />
        ) : (
          relatedArticlesData?.map(
            (item: any) =>
              item?._id !== singleArticleId && (
                <Box
                  key={item?.id}
                  display="flex"
                  alignItems="center"
                  p={1}
                  borderRadius={1}
                  bgcolor={theme?.palette?.grey?.[100]}
                  mt={0.5}
                  onClick={() => handleRelatedArticles(item?._id)}
                  sx={{
                    cursor: 'pointer',
                    ':hover': { bgcolor: theme?.palette?.grey?.[700] },
                  }}
                >
                  <DocumentTextIcon />
                  <Typography color="secondary">
                    {truncateText(item?.title)}
                  </Typography>
                </Box>
              ),
          )
        )}
      </Box>

      {showFeedbackField ? (
        <>
          <Typography color="secondary" variant="body2" mb={1}>
            Sorry we cannot be helpful. Help us improve this article with your
            feedback.
          </Typography>
          <FormProvider methods={feedbackMethod} onSubmit={feedbackSubmit}>
            <Grid container>
              {feedbackDataArray?.map((item: any) => {
                if (
                  item?.showField ||
                  (item?.componentProps.name === 'email' && companyId)
                ) {
                  return (
                    <Grid item xs={12} key={item?.id}>
                      <item.component {...item?.componentProps} />
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
            <Divider sx={{ m: 1.5 }} />
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <LoadingButton
                variant="outlined"
                color="secondary"
                disabled={feedbackIsLoading}
                onClick={() => setShowFeedbackField(false)}
                className="small"
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={feedbackIsLoading}
                variant="contained"
                type="submit"
                className="small"
              >
                Submit
              </LoadingButton>
            </Box>
          </FormProvider>
        </>
      ) : showOkFeedback ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={0.5}
          mt={6}
        >
          <CheckCircleIcon sx={{ color: 'success.main' }} />
          <Typography color="secondary" variant="body2">
            Glad we could helpful. Thanks for the feedback.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography
            color="secondary"
            variant="body2"
            display="flex"
            justifyContent="center"
            mt={3}
          >
            Was this answer helpful?
          </Typography>
          <Divider sx={{ m: 1.5 }} />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <LoadingButton
              variant="outlined"
              color="secondary"
              className="small"
              disabled={feedbackIsLoading}
              onClick={() => setShowFeedbackField(true)}
            >
              No
            </LoadingButton>
            <LoadingButton
              variant="contained"
              className="small"
              loading={feedbackIsLoading}
              onClick={helpfulSubmit}
            >
              Yes
            </LoadingButton>
          </Box>
        </>
      )}
    </Box>
  );
};
