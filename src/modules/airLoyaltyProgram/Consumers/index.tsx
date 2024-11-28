import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import { useConsumer } from './useConsumer';
import { ConsumersCustomizeIcon } from '@/assets/icons';
import { ConsumerCustomizeColumns } from './consumerCustomizeColumns';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS } from '@/constants/permission-keys';
import { PublicSingleDropdownButton } from '@/components/PublicSingleDropdownButton';

export const Consumers = () => {
  const {
    handleSearch,
    consumersListColumn,
    isDrawerOpen,
    closeDrawer,
    openDrawer,
    setCustomizeColumns,
    customizeColumns,
    filterColumns,
    selectedConsumerList,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    refetch,
    page,
    setPage,
    setPageLimit,
    pageLimit,
    headerActionButtonDropdown,
    statusQuery,
  } = useConsumer();

  return (
    <>
      <PageTitledHeader title={'Consumers'} />
      <Box border={`1px solid`} borderColor={'grey.700'} borderRadius={2}>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          gap={2}
          justifyContent={'space-between'}
          p={2}
        >
          <Box gap={2} display={'flex'} alignItems={'center'}>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS?.SEARCH_DETAILS,
              ]}
            >
              <Search
                label={'Search'}
                setSearchBy={handleSearch}
                size={'small'}
              />
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS?.STATUS]}
            >
              <PublicSingleDropdownButton
                dropdownOptions={headerActionButtonDropdown}
                disabled={
                  !!!selectedConsumerList?.length || statusQuery?.isLoading
                }
              />
            </PermissionsGuard>
          </Box>
          <PermissionsGuard
            permissions={[AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS?.CUSTOMIZE]}
          >
            <Button
              className="small"
              variant="outlined"
              color="inherit"
              startIcon={<ConsumersCustomizeIcon />}
              onClick={openDrawer}
            >
              Customize
            </Button>
          </PermissionsGuard>
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS?.VIEW_DETAILS,
          ]}
        >
          <TanstackTable
            data={data?.data?.consumers}
            columns={filterColumns}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            isSuccess={isSuccess}
            isPagination
            count={data?.data?.meta?.pages}
            pageLimit={pageLimit}
            currentPage={page}
            totalRecords={data?.data?.meta?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
            errorProps={{ canRefresh: true, refresh: refetch }}
          />
        </PermissionsGuard>
      </Box>

      {isDrawerOpen && (
        <ConsumerCustomizeColumns
          isDrawerOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
          setCustomizeColumns={setCustomizeColumns}
          customizeColumns={customizeColumns}
          consumersListColumn={consumersListColumn}
        />
      )}
    </>
  );
};
