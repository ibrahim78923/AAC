import { Box } from '@mui/material';
import Search from '@/components/Search';
import { useKnowledgeBaseDetail } from './useKnowledgeBaseDetail';
import { KnowledgeBaseArticles } from './KnowledgeBaseArticles';
import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import { PageTitledHeader } from '@/components/PageTitledHeader';

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

  if (isError)
    return (
      <>
        <PageTitledHeader
          title={'Knowledge Base'}
          canMovedBack
          moveBack={handleKnowledgeBase}
        />
        <ApiErrorState canRefresh refresh={() => refetch?.()} />
      </>
    );

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
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : (
        <>
          <Box height={'28rem'} overflow={'scroll'}>
            {!!articlesData?.length ? (
              articlesData?.map((item: any) => (
                <KnowledgeBaseArticles
                  key={item?._id}
                  articleId={item?._id}
                  articlesTitle={item?.title}
                  modifiedDate={dayjs(item?.updatedAt)?.format(
                    DATE_TIME_FORMAT?.UI,
                  )}
                  purposeDescription={item?.details}
                />
              ))
            ) : (
              <NoData message="No articles found" />
            )}
          </Box>
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
      )}
    </Box>
  );
};
