import Search from '@/components/Search';
import { Box, Button, Typography } from '@mui/material';
import { useCannedResponsesList } from './useCannedResponsesList';
import CustomPagination from '@/components/CustomPagination';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

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
        <AddNewItemButton
          variant="text"
          color="inherit"
          name="Add Canned Response"
        />
      </Link>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        hasNoData={!data?.data?.responses?.length}
        noDataMessage="No canned response found"
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_BIG_LARGE_CARD}
      >
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
      </ApiRequestFlow>
    </CustomCommonDialog>
  );
};
