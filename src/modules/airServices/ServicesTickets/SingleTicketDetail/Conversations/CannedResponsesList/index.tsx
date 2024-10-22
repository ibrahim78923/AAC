import Search from '@/components/Search';
import { Box, Button, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useCannedResponsesList } from './useCannedResponsesList';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';
import CustomPagination from '@/components/CustomPagination';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import Link from 'next/link';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { AIR_SERVICES } from '@/constants/routes';

export const CannedResponsesList = (props: any) => {
  const { setCannedResponse } = props;
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
  } = useCannedResponsesList();

  return (
    <CustomCommonDialog
      isPortalOpen={isResponsePortalOpen?.isOpen}
      closePortal={closeModal}
      dialogTitle="Canned Response"
      showActionButtons={false}
    >
      <Box my={1}>
        <Search label="Search Here" setSearchBy={handleSearch} width={'100%'} />
      </Box>
      <Link href={AIR_SERVICES?.CANNED_RESPONSE_SETTINGS}>
        <Button
          disableElevation
          variant="text"
          color="inherit"
          startIcon={<AddCircle color="primary" />}
          size="small"
          className="small"
        >
          Add Canned Response
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
    </CustomCommonDialog>
  );
};
