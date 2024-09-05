import { Box, Grid, Skeleton } from '@mui/material';
import { useKnowledgeBaseArticleDetail } from './useKnowledgeBaseArticleDetail';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { KnowledgeBaseRelatedArticles } from './KnowledgeBaseRelatedArticles';
import { truncateText } from '@/utils/avatarUtils';

export const KnowledgeBaseArticleDetail = () => {
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
  } = useKnowledgeBaseArticleDetail();

  return (
    <PermissionsGuard
      permissions={[
        AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS?.VIEW_ARTICLES_DIFFERENT_CATEGORY,
      ]}
    >
      <Grid
        container
        justifyContent="space-between"
        spacing={1}
        height={'100%'}
        minHeight={'45rem'}
      >
        <Grid item xs={12} lg={9} display={'flex'} flexDirection={'column'}>
          <PageTitledHeader
            title={
              isLoading || isFetching ? (
                <Skeleton variant="rectangular" width="10rem" />
              ) : (
                truncateText(singleArticlesData?.title)
              )
            }
            canMovedBack
            moveBack={handlePageBack}
          />
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : (
            <Box
              height={'1rem'}
              overflow="scroll"
              flexGrow={1}
              p={1}
              dangerouslySetInnerHTML={{ __html: singleArticlesData?.details }}
            />
          )}
        </Grid>

        <Grid item xs={12} lg={3} display={'flex'}>
          <Box
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
            p={1}
            flexGrow={1}
          >
            <KnowledgeBaseRelatedArticles
              loadingArticles={loadingArticles}
              fetchingArticles={fetchingArticles}
              relatedArticlesData={relatedArticlesData}
              handleRelatedArticles={handleRelatedArticles}
              singleArticleId={singleArticleId}
              theme={theme}
              showFeedbackField={showFeedbackField}
              feedbackMethod={feedbackMethod}
              feedbackSubmit={feedbackSubmit}
              feedbackDataArray={feedbackDataArray}
              showOkFeedback={showOkFeedback}
              feedbackIsLoading={feedbackIsLoading}
              setShowFeedbackField={setShowFeedbackField}
              helpfulSubmit={helpfulSubmit}
            />
          </Box>
        </Grid>
      </Grid>
    </PermissionsGuard>
  );
};
