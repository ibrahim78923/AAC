import { Box, Skeleton } from '@mui/material';
import Search from '@/components/Search';
import { useKnowledgeBaseDetail } from './useKnowledgeBaseDetail';
import { KnowledgeBaseTicket } from './KnowledgeBaseTicket';
import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const KnowledgeBaseDetail = () => {
  const {
    handleKnowledgeBase,
    SetSearchValue,
    setPage,
    setPageLimit,
    articlesData,
    articlesMetaData,
    isLoading,
    folderId,
    folderName,
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
    <PermissionsGuard
      permissions={[
        AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS?.VIEW_ARTICLES_DIFFERENT_CATEGORY,
      ]}
    >
      <Box border={1} borderColor="grey.700" p={2} borderRadius={2}>
        <PageTitledHeader
          title={
            isLoading || isFetching ? (
              <Skeleton variant="rectangular" width={'10rem'} />
            ) : folderName ? (
              `Knowledge Base - ${folderName}`
            ) : (
              'Knowledge Base'
            )
          }
          canMovedBack
          moveBack={handleKnowledgeBase}
        />
        <br />
        <Box>
          <Search label="Search Here" setSearchBy={SetSearchValue} />
        </Box>
        <br />
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : (
          <>
            <Box height={'34rem'} overflow={'scroll'}>
              {!!articlesData?.length ? (
                articlesData?.map((item: any) => (
                  <KnowledgeBaseTicket
                    key={item?._id}
                    articleId={item?._id}
                    folderId={folderId}
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
    </PermissionsGuard>
  );
};
