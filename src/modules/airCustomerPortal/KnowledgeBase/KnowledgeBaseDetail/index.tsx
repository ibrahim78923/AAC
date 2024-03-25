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

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;

  return (
    <Box border={`1px solid`} borderColor="grey.700" p={2} borderRadius={2}>
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={1}
        sx={{ cursor: 'pointer' }}
      >
        <ArrowBackIcon onClick={() => handleKnowledgeBase()} />
        <Typography variant="h4">Knowledge Base - {folderName}</Typography>
      </Box>
      <br />
      <Box>
        <Search label="Search Here" setSearchBy={SetSearchValue} />
      </Box>
      <br />
      {!!articlesData?.length ? (
        articlesData?.map((item: any) => (
          <KnowledgeBaseTicket
            key={item?._id}
            articleId={item?._id}
            folderId={folderId}
            articlesTitle={item?.title}
            folderName={folderName}
            modifiedDate={dayjs(item?.updatedAt)?.format(DATE_TIME_FORMAT?.UI)}
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
    </Box>
  );
};
