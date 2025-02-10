import TanstackTable from '@/components/Table/TanstackTable';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import { contractsTableColumns } from './ContractsDetail.data';
import { useContractDetail } from './useContractDetail';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';
import { AIR_SERVICES } from '@/constants/routes';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

export const ContractsDetails = () => {
  const {
    page,
    setPage,
    limit,
    setLimit,
    handleSearch,
    router,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    softwareContractData,
    softwareContractMeta,
    handleSoftwareContract,
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
        ml={0.5}
      >
        <Search label="Search Here" setSearchBy={handleSearch} />
        <AddNewItemButton
          name="Create New Contract"
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.UPSERT_SOFTWARE_CONTRACT,
              query: {
                ...router?.query,
              },
            })
          }
        />
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
        onPageChange={(page: number) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
        errorProps={{ canRefresh: true, refresh: handleSoftwareContract }}
      />
    </PermissionsGuard>
  );
};
