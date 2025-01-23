import { Box } from '@mui/material';
import { useKnowledgeBaseArticleDetail } from './useKnowledgeBaseArticleDetail';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { KnowledgeBaseRelatedArticles } from './KnowledgeBaseRelatedArticles';
import { truncateText } from '@/utils/avatarUtils';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { CustomGrid } from '@/components/Grids/CustomGrid';

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
    <CustomGrid
      isContainer
      customStyles={{
        height: '100%',
        minHeight: '45rem',
        justifyContent: 'space-between',
      }}
      spacing={1}
    >
      <CustomGrid xs={12} lg={9}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            <Box
              height={'1rem'}
              overflow="scroll"
              flexGrow={1}
              p={1}
              dangerouslySetInnerHTML={{ __html: singleArticlesData?.details }}
            />
          )}
        </Box>
      </CustomGrid>

      <CustomGrid xs={12} lg={3} customStyles={{ display: 'flex' }}>
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
      </CustomGrid>
    </CustomGrid>
  );
};
