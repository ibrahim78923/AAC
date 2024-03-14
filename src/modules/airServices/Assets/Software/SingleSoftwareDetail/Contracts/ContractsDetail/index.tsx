import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import { AddCircleBlackIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { contractsTableColumns } from './ContractsDetail.data';
import { useContractDetail } from './useContractDetail';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';

export const ContractsDetails = () => {
  const {
    page,
    setPage,
    limit,
    setLimit,
    searchBy,
    setSearchBy,
    router,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    softwareContractData,
    softwareContractMeta,
  } = useContractDetail();
  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.CONTRACTS]}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Search
          label="Search Here"
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />
        <Button
          startIcon={<AddCircleBlackIcon />}
          color="secondary"
          size="large"
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.UPSERT_SOFTWARE_CONTRACT,
              query: {
                ...router?.query,
              },
            })
          }
        >
          Create New Contract
        </Button>
      </Box>
      <br />
      <TanstackTable
        data={softwareContractData}
        columns={contractsTableColumns}
        isPagination
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        count={softwareContractMeta?.pages}
        totalRecords={softwareContractMeta?.total}
        pageLimit={limit}
        currentPage={page}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
      />
    </PermissionsGuard>
  );
};
