import { CardLayout } from '../CardLayout';
import { Box, Grid } from '@mui/material';
import { DocumentTextIcon } from '@/assets/icons';
import { usePopularArticles } from './usePopularArticles';
import { PopularArticlesDataI } from './PopularArticles.interface';
import { TruncateText } from '@/components/TruncateText';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const PopularArticles = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    refetch,
    companyId,
    articlesRoute,
  } = usePopularArticles();

  return (
    <CardLayout
      title={'Popular Articles'}
      btnClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
          query: { ...(companyId && { companyId }) },
        });
      }}
      maxHeight={'40vh'}
      btnPosition={'center'}
      buttonText={'View More'}
    >
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={
          SKELETON_TYPES?.MEDIUM_HORIZONTAL_TWO_LAYER_ROUNDED_CARD
        }
        hasNoData={!data?.data?.articles}
        length={9}
        NoDataMessage={'No article found'}
        errorHeight="100%"
      >
        {
          <Grid container spacing={2}>
            {data?.data?.articles?.map((article: PopularArticlesDataI) => (
              <Grid item md={6} xs={12} key={article?._id}>
                <Box
                  height="100%"
                  display={'flex'}
                  gap={1}
                  p={1}
                  bgcolor="grey.100"
                  alignItems={'center'}
                  sx={{ cursor: 'pointer' }}
                  borderRadius={2}
                  onClick={() => {
                    router?.push({
                      pathname:
                        AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
                      query: {
                        articleId: article?._id,
                        folderId: article?.folder?._id,
                        articlesRoute: articlesRoute,
                        ...(companyId && { companyId }),
                      },
                    });
                  }}
                >
                  <DocumentTextIcon />

                  <TruncateText text={article?.title?.toLowerCase()} />
                </Box>
              </Grid>
            ))}
          </Grid>
        }
      </ApiRequestFlow>
    </CardLayout>
  );
};
