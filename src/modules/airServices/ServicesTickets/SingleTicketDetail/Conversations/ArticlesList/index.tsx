import Search from '@/components/Search';
import { Box, Typography } from '@mui/material';
import { useArticlesList } from './useArticlesList';
import CustomPagination from '@/components/CustomPagination';
import { TICKET_CONVERSATIONS_CONTENT_TYPE } from '@/constants/strings';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { CustomButton } from '@/components/Buttons/CustomButton';

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
          <AddNewItemButton
            variant="text"
            color="inherit"
            name=" Add New Article"
          />
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
                <CustomButton
                  hasIcon={false}
                  variant="text"
                  onClick={() =>
                    setArticleResponse?.(
                      article,
                      TICKET_CONVERSATIONS_CONTENT_TYPE?.LINK,
                    )
                  }
                >
                  Add Link
                </CustomButton>
                <CustomButton
                  hasIcon={false}
                  onClick={() =>
                    setArticleResponse?.(
                      article,
                      TICKET_CONVERSATIONS_CONTENT_TYPE?.CONTENT,
                    )
                  }
                >
                  Add Content
                </CustomButton>
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
