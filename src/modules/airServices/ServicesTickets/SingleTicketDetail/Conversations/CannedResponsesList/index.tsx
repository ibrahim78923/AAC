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
import { useCannedResponsesList } from './useCannedResponsesList';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import CustomPagination from '@/components/CustomPagination';
import { AIR_SERVICES } from '@/constants';
import CloseIcon from '@mui/icons-material/Close';

export const CannedResponsesList = (props: any) => {
  const { isModalOpen, setCannedResponse } = props;
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
    refetch,
  } = useCannedResponsesList(props);

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
          mb={1.5}
        >
          <Typography variant="h4" color="slateBlue.main">
            Canned Response
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => closeModal?.()}
          />
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
            router?.push({ pathname: AIR_SERVICES?.CANNED_RESPONSE_SETTINGS })
          }
          size="small"
          className="small"
        >
          Add Canned Response
        </Button>
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : isError ? (
          <ApiErrorState canRefresh refresh={() => refetch?.()} />
        ) : !!data?.data?.responses?.length ? (
          <>
            {data?.data?.responses?.map((response: any) => (
              <Box
                border={'1px solid'}
                borderColor={'custom.off_white_three'}
                p={2}
                bgcolor={'grey.100'}
                borderRadius={2}
                my={1}
                key={response?._id}
              >
                <Typography variant="body2" color="slateBlue.main">
                  {response?.title ?? '---'}
                </Typography>
                <Box mt={1}>
                  <Button
                    disableElevation
                    variant="outlined"
                    onClick={() => setCannedResponse(response)}
                    size="small"
                    className="small"
                  >
                    Add
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
          <NoData message="No canned response found" />
        )}
      </DialogContent>
    </Dialog>
  );
};
