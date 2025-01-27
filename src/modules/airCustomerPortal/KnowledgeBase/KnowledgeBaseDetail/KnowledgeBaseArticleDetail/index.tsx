import { Box, Typography } from '@mui/material';
import { useKnowledgeBaseArticleDetail } from './useKnowledgeBaseArticleDetail';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { KnowledgeBaseRelatedArticles } from './KnowledgeBaseRelatedArticles';
import { truncateText } from '@/utils/avatarUtils';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { Attachments } from '@/components/Attachments';

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
    companyId,
  } = useKnowledgeBaseArticleDetail();

  return (
    <ContainerGrid spacing={1}>
      <CustomGrid lg={9}>
        <Box sx={{ height: '100%' }}>
          <PageTitledHeader
            title={
              isLoading || isFetching ? (
                <CustomLinearProgress />
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
            <>
              <Box
                sx={{ wordBreak: 'break-all', overflow: 'auto' }}
                dangerouslySetInnerHTML={{
                  __html: singleArticlesData?.details,
                }}
              />
              {!!singleArticlesData?._id && (
                <>
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightMedium"
                    color="slateBlue.main"
                    my={2}
                  >
                    Attachments
                  </Typography>
                  <Box>
                    <Attachments
                      recordId={singleArticlesData?._id as string}
                      size={{ width: '100%', height: '100%' }}
                      hasNoDeletePermission
                      hasStyling={false}
                      canDelete={false}
                    />
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </CustomGrid>

      <CustomGrid xs={12} lg={3}>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box
            borderLeft={{
              lg: `1px solid ${theme?.palette?.grey?.[700]}`,
              xs: 'none',
            }}
            borderTop={{
              lg: 'none',
              xs: `1px solid ${theme?.palette?.grey?.[700]}`,
            }}
            borderBottom={{
              lg: 'none',
              xs: `1px solid ${theme?.palette?.grey?.[700]}`,
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
              companyId={companyId}
            />
          </Box>
        </Box>
      </CustomGrid>
    </ContainerGrid>
  );
};
