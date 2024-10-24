import Search from '@/components/Search';
import { Box, Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useArticlesList } from './useArticlesList';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';
import CustomPagination from '@/components/CustomPagination';
import { TICKET_CONVERSATIONS_CONTENT_TYPE } from '@/constants/strings';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import Link from 'next/link';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { AIR_SERVICES } from '@/constants/routes';

export const ArticlesList = (props: any) => {
  const { setArticleResponse } = props;
  const {
    data,
    isLoading,
    isFetching,
    isError,
    setPage,
    setPageLimit,
    closeModal,
    refetch,
    isResponsePortalOpen,
    handleSearch,
  } = useArticlesList();

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={isResponsePortalOpen?.isOpen}
        closePortal={closeModal}
        dialogTitle="Article"
        showActionButtons={false}
      >
        <Box my={1}>
          <Search
            label="Search Here"
            setSearchBy={handleSearch}
            width={'100%'}
          />
        </Box>
        <Link href={AIR_SERVICES?.UPSERT_ARTICLE}>
          <Button
            disableElevation
            variant="text"
            color="inherit"
            startIcon={<AddCircleIcon color="primary" />}
            size="small"
            className="small"
          >
            Add New Article
          </Button>
        </Link>
        {isLoading || isFetching ? (
          <SkeletonCard
            gridSize={{ md: 12 }}
            hasCircularSkeleton={false}
            flexDirection="column"
          />
        ) : isError ? (
          <ApiErrorState canRefresh refresh={refetch} />
        ) : !!data?.data?.articles?.length ? (
          <>
            {data?.data?.articles?.map((article: any) => (
              <Box
                border={'1px solid'}
                borderColor={'custom.off_white_three'}
                p={2}
                bgcolor={'grey.100'}
                borderRadius={2}
                my={1}
                key={article?._id}
              >
                <Typography variant="body2" color="slateBlue.main">
                  {article?.title}
                </Typography>
                <Box
                  mt={1}
                  display={'flex'}
                  alignItems={'center'}
                  gap={2}
                  flexWrap={'wrap'}
                >
                  <Button
                    disableElevation
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      setArticleResponse?.(
                        article,
                        TICKET_CONVERSATIONS_CONTENT_TYPE?.LINK,
                      )
                    }
                    size="small"
                    className="small"
                  >
                    Add Link
                  </Button>
                  <Button
                    disableElevation
                    variant="outlined"
                    onClick={() =>
                      setArticleResponse?.(
                        article,
                        TICKET_CONVERSATIONS_CONTENT_TYPE?.CONTENT,
                      )
                    }
                    size="small"
                    className="small"
                  >
                    Add Content
                  </Button>
                </Box>
              </Box>
            ))}
            <CustomPagination
              currentPage={data?.data?.meta?.page}
              count={data?.data?.meta?.pages}
              pageLimit={data?.data?.meta?.limit}
              totalRecords={data?.data?.meta?.total}
              onPageChange={(page: number) => setPage?.(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </>
        ) : (
          <NoData message="No article found" />
        )}
      </CustomCommonDialog>
    </>
  );
};
