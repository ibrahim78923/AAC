import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
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
  } = useKnowledgeBaseDetail();

  if (isError) return <ApiErrorState />;

  return (
    <PermissionsGuard
      permissions={[
        AIR_CUSTOMER_PORTAL_KNOWLEDGE_BASE_PERMISSIONS?.VIEW_ARTICLES_DIFFERENT_CATEGORY,
      ]}
    >
      <Box border={`1px solid`} borderColor="grey.700" p={2} borderRadius={2}>
        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          gap={1}
        >
          <ArrowBackIcon
            onClick={() => handleKnowledgeBase()}
            sx={{ cursor: 'pointer' }}
          />
          <Typography variant="h4">
            {folderName ? `Knowledge Base - ${folderName}` : 'Knowledge Base'}
          </Typography>
        </Box>
        <br />
        <Box>
          <Search label="Search Here" setSearchBy={SetSearchValue} />
        </Box>
        <br />
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : (
          <>
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
                  purposeDescription={item?.folder?.description}
                />
              ))
            ) : (
              <NoData message="No articles found" />
            )}
            <br />
            <CustomPagination
              count={articlesMetaData?.pages}
              totalRecords={articlesMetaData?.total}
              pageLimit={articlesMetaData?.limit}
              currentPage={articlesMetaData?.page}
              onPageChange={(page: any) => setPage(page)}
              setPageLimit={setPageLimit}
              setPage={setPage}
            />
          </>
        )}
      </Box>
    </PermissionsGuard>
  );
};
