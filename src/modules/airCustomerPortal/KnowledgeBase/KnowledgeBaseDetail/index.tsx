import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import Search from '@/components/Search';
import { useKnowledgeBaseDetail } from './useKnowledgeBaseDetail';
import { KnowledgeBaseTicket } from './KnowledgeBaseTicket';
import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const KnowledgeBaseDetail = () => {
  const {
    handleKnowledgeBase,
    searchValue,
    SetSearchValue,
    theme,
    page,
    pageLimit,
    setPage,
    setPageLimit,
    articlesData,
    articlesMetaData,
    handlePageChange,
    formatDateTime,
    isLoading,
    folderId,
  } = useKnowledgeBaseDetail();

  return (
    <Box
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      p={2}
      borderRadius={2}
    >
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={1}
        sx={{ cursor: 'pointer' }}
      >
        <ArrowBackIcon onClick={() => handleKnowledgeBase()} />
        <Typography variant="h4">
          Knowledge Base - {articlesData?.[0]?.folder?.name}
        </Typography>
      </Box>
      <Box mt={2} mb={4}>
        <Search
          label="Search Here"
          searchBy={searchValue}
          setSearchBy={SetSearchValue}
        />
      </Box>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          {articlesData?.map((item: any) => (
            <KnowledgeBaseTicket
              key={item?._id}
              articleId={item?._id}
              folderId={folderId}
              articlesTitle={item?.title}
              modifiedDate={formatDateTime(item?.updatedAt)}
              purposeDescription={item?.folder?.description}
            />
          ))}
        </>
      )}
      <CustomPagination
        count={articlesMetaData?.pages}
        totalRecords={articlesMetaData?.total}
        pageLimit={pageLimit}
        currentPage={page}
        rowsPerPageOptions={[10, 20]}
        onPageChange={handlePageChange}
        setPageLimit={setPageLimit}
        setPage={setPage}
      />
    </Box>
  );
};
