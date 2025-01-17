import Search from '@/components/Search';
import { Box, Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useArticlesList } from './useArticlesList';
import CustomPagination from '@/components/CustomPagination';
import { TICKET_CONVERSATIONS_CONTENT_TYPE } from '@/constants/strings';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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

        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          refreshApi={refetch}
          hasNoData={!data?.data?.articles?.length}
          noDataMessage="No article found"
          skeletonType={SKELETON_TYPES?.BASIC_CARD}
          cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_BIG_LARGE_CARD}
        >
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
        </ApiRequestFlow>
      </CustomCommonDialog>
    </>
  );
};
