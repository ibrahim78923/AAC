import TanstackTable from '@/components/Table/TanstackTable';
import { useArticlesLists } from './useArticlesList';

export const ArticlesLists = () => {
  const {
    page,
    getArticlesListData,
    lazyGetArticlesStatus,
    articlesListColumns,
    handleSetPage,
    handleSetPageLimit,
    handlePageChange,
    increment,
    decrement,
  } = useArticlesLists();

  return (
    <TanstackTable
      data={lazyGetArticlesStatus?.data?.data?.articles}
      columns={articlesListColumns}
      isLoading={lazyGetArticlesStatus?.isLoading}
      currentPage={lazyGetArticlesStatus?.data?.data?.meta?.page}
      count={lazyGetArticlesStatus?.data?.data?.meta?.pages}
      pageLimit={lazyGetArticlesStatus?.data?.data?.meta?.limit}
      totalRecords={lazyGetArticlesStatus?.data?.data?.meta?.total}
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={lazyGetArticlesStatus?.isFetching}
      isError={lazyGetArticlesStatus?.isError}
      isSuccess={lazyGetArticlesStatus?.isSuccess}
      onPageChange={handlePageChange}
      isPagination
      errorProps={{
        canRefresh: true,
        refresh: () => getArticlesListData?.(page),
      }}
      incrementPageClick={increment}
      decrementPageClick={decrement}
    />
  );
};
