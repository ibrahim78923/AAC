import { DocumentTextIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import { ItemSummaryCard } from '@/components/Cards/ItemSummaryCard';
import { useRelatedArticles } from './useRelatedArticles';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ArticleFeedback } from '../ArticleFeedback';

export const RelatedArticles = () => {
  const {
    relatedArticlesData,
    isError,
    refetch,
    showLoader,
    handleRelatedArticles,
  } = useRelatedArticles();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      <Typography variant="h4">Related Articles</Typography>
      <br />
      <Box sx={{ flexGrow: 1, maxHeight: '80%', overflow: 'auto' }}>
        <ApiRequestFlow
          showSkeleton={showLoader}
          hasError={isError}
          refreshApi={refetch}
          skeletonType={SKELETON_TYPES?.BASIC_CARD}
          cardSkeletonType={
            SKELETON_TYPES?.SMALL_HORIZONTAL_TWO_LAYER_CIRCULAR_CARD
          }
          hasNoData={!relatedArticlesData?.length}
          noDataMessage="No related articles found"
        >
          {relatedArticlesData?.map((article: any) => (
            <Box key={article?._id} sx={{ my: 1 }}>
              <ItemSummaryCard
                onClick={() => handleRelatedArticles(article?._id)}
                Icon={<DocumentTextIcon />}
                name={article?.title}
              />
            </Box>
          ))}
        </ApiRequestFlow>
      </Box>
      <Box sx={{ my: 2 }}>
        <ArticleFeedback />
      </Box>
    </Box>
  );
};
