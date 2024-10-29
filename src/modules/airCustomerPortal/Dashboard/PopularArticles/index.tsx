import { CardLayout } from '../CardLayout';
import { Box, Grid } from '@mui/material';
import { DocumentTextIcon } from '@/assets/icons';
import { usePopularArticles } from './usePopularArticles';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { PopularArticlesDataI } from './PopularArticles.interface';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { TruncateText } from '@/components/TruncateText';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';

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
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState height={'100%'} canRefresh refresh={() => refetch?.()} />
      ) : (
        <>
          {!!data?.data?.articles?.length ? (
            <Grid container spacing={2}>
              {data?.data?.articles?.map((article: PopularArticlesDataI) => (
                <Grid item md={6} xs={12} key={article?._id}>
                  <Box
                    height="1005"
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
          ) : (
            <Box width={'100%'} height="100%">
              <NoData height={'100%'} />
            </Box>
          )}
        </>
      )}
    </CardLayout>
  );
};
