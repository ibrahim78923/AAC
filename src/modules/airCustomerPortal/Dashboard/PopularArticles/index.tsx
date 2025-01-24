import { CardLayout } from '../CardLayout';
import { DocumentTextIcon } from '@/assets/icons';
import { usePopularArticles } from './usePopularArticles';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ItemSummaryCard } from '@/components/Cards/ItemSummaryCard';
import { ListGrid } from '@/components/Grids/ListGrid';

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
        hasNoData={!!!data?.data?.articles?.length}
        length={9}
        noDataMessage={'No article found'}
        errorHeight="100%"
      >
        <ListGrid
          list={data?.data?.articles}
          render={(article: any) => (
            <ItemSummaryCard
              onClick={() => {
                router?.push({
                  pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
                  query: {
                    articleId: article?._id,
                    folderId: article?.folder?._id,
                    articlesRoute: articlesRoute,
                    ...(companyId && { companyId }),
                  },
                });
              }}
              Icon={<DocumentTextIcon />}
              name={article?.title}
            />
          )}
        />
      </ApiRequestFlow>
    </CardLayout>
  );
};
