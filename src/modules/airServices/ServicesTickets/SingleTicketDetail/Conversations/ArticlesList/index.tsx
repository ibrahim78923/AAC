import { AlertModalCloseIcon } from '@/assets/icons';
import Search from '@/components/Search';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useArticlesList } from './useArticlesList';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import CustomPagination from '@/components/CustomPagination';
import { AIR_SERVICES } from '@/constants';
import { TICKET_CONVERSATIONS_CONTENT_TYPE } from '@/constants/strings';

export const ArticlesList = (props: any) => {
  const { isModalOpen, setArticleResponse } = props;
  const {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    setPage,
    setPageLimit,
    setSearch,
    closeModal,
  } = useArticlesList(props);

  return (
    <Dialog
      open={isModalOpen?.isOpen}
      onClose={() => closeModal?.()}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
        >
          <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            <Typography variant="h3" textTransform={'capitalize'}>
              Article
            </Typography>
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => closeModal?.()}>
            <AlertModalCloseIcon />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box my={1}>
          <Search label="Search Here" setSearchBy={setSearch} width={'100%'} />
        </Box>
        <Button
          disableElevation
          variant="text"
          color="inherit"
          startIcon={<AddCircleIcon color="primary" />}
          onClick={() =>
            router?.push({ pathname: AIR_SERVICES?.UPSERT_ARTICLE })
          }
          size="small"
          className="small"
        >
          Add New Article
        </Button>
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : isError ? (
          <ApiErrorState />
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
              onPageChange={(page: any) => setPage?.(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </>
        ) : (
          <NoData />
        )}
      </DialogContent>
    </Dialog>
  );
};
