import { Box } from '@mui/material';
import Search from '@/components/Search';
import { useKnowledgeBaseDetail } from './useKnowledgeBaseDetail';
import { KnowledgeBaseArticles } from './KnowledgeBaseArticles';
import CustomPagination from '@/components/CustomPagination';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { uiDateFormat } from '@/lib/date-time';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const KnowledgeBaseDetail = () => {
  const {
    handleKnowledgeBase,
    handleSearch,
    setPage,
    setPageLimit,
    articlesData,
    articlesMetaData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useKnowledgeBaseDetail();

  return (
    <Box border={1} borderColor="grey.700" p={2} borderRadius={2}>
      <PageTitledHeader
        title={'Knowledge Base'}
        canMovedBack
        moveBack={handleKnowledgeBase}
      />
      <Box>
        <Search label="Search Here" setSearchBy={handleSearch} size="small" />
      </Box>
      <br />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
        hasNoData={!articlesData?.length}
        noDataMessage={'No articles found'}
      >
        <>
          {articlesData?.map((item: any) => (
            <KnowledgeBaseArticles
              key={item?._id}
              articleId={item?._id}
              articlesTitle={item?.title}
              modifiedDate={uiDateFormat(item?.updatedAt)}
              purposeDescription={item?.details}
            />
          ))}
          <br />
          <CustomPagination
            count={articlesMetaData?.pages}
            totalRecords={articlesMetaData?.total}
            pageLimit={articlesMetaData?.limit}
            currentPage={articlesMetaData?.page}
            onPageChange={(page: number) => setPage(page)}
            setPageLimit={setPageLimit}
            setPage={setPage}
          />
        </>
      </ApiRequestFlow>
    </Box>
  );
};
