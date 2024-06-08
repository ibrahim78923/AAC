import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { CircularProgress, Typography } from '@mui/material';
import useDeals from './useDeals';
import AddDeals from './AddDeals';

export default function Deals({ isDrawerOpen, setIsDrawerOpen }: any) {
  const {
    onClose,
    submitHandler,
    selected,
    setSelected,
    associateDealsColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
  } = useDeals({
    setIsDrawerOpen,
  });

  return (
    <>
      {isDrawerOpen?.deal && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen?.deal}
          onClose={onClose}
          title={'Add Associate Deals'}
          footer
          isOk
          okText={'Associate'}
          submitHandler={submitHandler}
          isDisabled={!selected?.length}
        >
          <AddDeals setSelected={setSelected} selected={selected} />
        </CommonDrawer>
      )}

      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DEALS_LIST_VIEW]}
      >
        <Typography variant={'h5'}>
          <Typography
            variant={'body1'}
            component={'span'}
            bgcolor={'secondary.main'}
            borderRadius={1}
            p={0.4}
            color={'common.white'}
            mr={0.5}
          >
            {isLoading || isFetching ? (
              <CircularProgress size={18} />
            ) : data?.data?.tickets?.length > 1 ? (
              data?.data?.tickets?.length
            ) : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id ? (
              data?.data?.tickets?.length
            ) : (
              0
            )}
          </Typography>
          Deals
        </Typography>

        <TanstackTable
          columns={associateDealsColumns}
          data={
            data?.data?.tickets?.length > 1
              ? data?.data?.tickets
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.tickets
                : []
          }
          isPagination
          isSuccess={isSuccess}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
          currentPage={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.page
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.page
                : 0
          }
          count={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.pages
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.pages
                : 0
          }
          totalRecords={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.total
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.total
                : 0
          }
          pageLimit={data?.data?.meta?.limit}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </PermissionsGuard>
    </>
  );
}
