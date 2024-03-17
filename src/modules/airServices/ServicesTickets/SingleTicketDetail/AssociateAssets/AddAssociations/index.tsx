import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { useAddAssociations } from './useAddAssociations';
import { Box } from '@mui/material';
import Search from '@/components/Search';

export const AddAssociations = (props: any) => {
  const { open } = props;
  const {
    associateAssetsColumns,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPageLimit,
    setPage,
    submitAssetAssociationList,
    closeAssetsAssociate,
    setSearch,
    selectedAssetToAssociateList,
    postTicketsAssociatesAssetsStatus,
  } = useAddAssociations(props);

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={() => closeAssetsAssociate?.()}
      title="Add associations"
      submitHandler={() => submitAssetAssociationList?.()}
      isOk
      footer
      okText="Associate"
      isDisabled={
        !!!selectedAssetToAssociateList?.length ||
        postTicketsAssociatesAssetsStatus?.isLoading
      }
    >
      <Search label="Search Here" width="100%" setSearchBy={setSearch} />
      <Box mt={2}> </Box>
      <TanstackTable
        columns={associateAssetsColumns}
        data={data?.data?.inventories}
        isPagination
        isSuccess={isSuccess}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
    </CommonDrawer>
  );
};
