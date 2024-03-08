import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';
import ContractsDrawerForm from './FilterContractsForm';
import { useContracts } from './useContracts';
import { ExportButton } from '@/components/ExportButton';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { EXPORT_TYPE } from '@/constants/strings';
import { DeleteContract } from './DeleteContract';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const Contracts = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
    handleAddNewContractClick,
    contractListsColumns,
    getContractListDataExport,
    lazyGetContractStatus,
    setPage,
    setPageLimit,
    setSearch,
    selectedContractList,
    setSelectedContractList,
    contractFilterLists,
    setContractFilterLists,
    theme,
    getContractListData,
    page,
  }: any = useContracts();
  return (
    <>
      <PageTitledHeader
        title={'Contracts'}
        addTitle={'Add New Contract'}
        createPermissionKey={
          AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.ADD_CONTRACT
        }
        handleAction={handleAddNewContractClick}
      />
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      >
        <Box px={2}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexWrap={'wrap'}
            gap={2}
          >
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.SEARCH_AND_FILTER,
              ]}
            >
              <Search label="Search Here" setSearchBy={setSearch} />
            </PermissionsGuard>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.DELETE_CONTRACTS,
                ]}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  disabled={!!!selectedContractList?.length}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete
                </Button>
              </PermissionsGuard>
              <ExportButton
                createPermissionKey={[
                  AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.EXPORT_CONTRACTS,
                ]}
                handleExcelExport={() =>
                  getContractListDataExport?.(EXPORT_TYPE?.XLS)
                }
                handleCsvExport={() =>
                  getContractListDataExport?.(EXPORT_TYPE?.CSV)
                }
              />
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.SEARCH_AND_FILTER,
                ]}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<FilterSharedIcon />}
                  onClick={() => setIsDrawerOpen(true)}
                >
                  Filter
                </Button>
              </PermissionsGuard>
            </Box>
          </Box>
        </Box>
        <br />
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.CONTRACTS_LIST_VIEW,
          ]}
        >
          <TanstackTable
            columns={contractListsColumns}
            data={lazyGetContractStatus?.data?.data?.contracts}
            isLoading={lazyGetContractStatus?.isLoading}
            currentPage={lazyGetContractStatus?.data?.data?.meta?.page}
            count={lazyGetContractStatus?.data?.data?.meta?.pages}
            pageLimit={lazyGetContractStatus?.data?.data?.meta?.limit}
            totalRecords={lazyGetContractStatus?.data?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            isFetching={lazyGetContractStatus?.isFetching}
            isError={lazyGetContractStatus?.isError}
            isSuccess={lazyGetContractStatus?.isSuccess}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </PermissionsGuard>
      </Box>
      {isDeleteModalOpen && (
        <DeleteContract
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          isDeleteModalOpen={isDeleteModalOpen}
          selectedContractList={selectedContractList}
          setSelectedContractList={setSelectedContractList}
          setPage={setPage}
          page={page}
          getContractListData={getContractListData}
          totalRecords={lazyGetContractStatus?.data?.data?.contracts?.length}
        />
      )}
      {isDrawerOpen && (
        <ContractsDrawerForm
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          contractFilterLists={contractFilterLists}
          setContractFilterLists={setContractFilterLists}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default Contracts;
