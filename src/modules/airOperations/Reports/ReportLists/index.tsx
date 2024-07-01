import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { FilterIcon, RestoreIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useReportLists } from './useReportLists';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const ReportLists = (props: any) => {
  const { onRestoreClick, permission } = props;
  const {
    reportListsColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetRestoreReportsListStatus,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    actionButtonDropdown,
    setSelectedReportLists,
    selectedReportLists,
  }: any = useReportLists(props);

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
      >
        <Box>
          <PermissionsGuard permissions={[permission?.SEARCH_RECORD]}>
            <Search label="Search Here" setSearchBy={setSearch} />
          </PermissionsGuard>
        </Box>
        <Box display={'flex'} gap={2}>
          <PermissionsGuard
            permissions={[
              permission?.CUSTOMIZE,
              permission?.RENAME,
              permission?.CLONE,
              permission?.EXPORT_RECORD,
              permission?.EMAIL_THIS_REPORT,
              permission?.CHANGE_OWNER,
              permission?.ADD_TO_DASHBOARD,
              permission?.DELETE,
              permission?.MANAGE_ACCESS,
            ]}
          >
            <SingleDropdownButton
              dropdownOptions={actionButtonDropdown}
              disabled={!!!selectedReportLists?.length}
            />
          </PermissionsGuard>
          <PermissionsGuard permissions={[permission?.RESTORE_RECORD]}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<RestoreIcon />}
              onClick={() => onRestoreClick?.()}
            >
              Restore
            </Button>
          </PermissionsGuard>
          <PermissionsGuard permissions={[permission?.FILTER_RECORD]}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSelectedReportLists?.([]);
                setIsPortalOpen?.({
                  isOpen: true,
                  isFilter: true,
                });
              }}
            >
              Filter
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={reportListsColumns}
        data={lazyGetRestoreReportsListStatus?.data?.list}
        isLoading={lazyGetRestoreReportsListStatus?.isLoading}
        currentPage={lazyGetRestoreReportsListStatus?.data?.data?.meta?.page}
        count={lazyGetRestoreReportsListStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetRestoreReportsListStatus?.data?.data?.meta?.limit}
        totalRecords={lazyGetRestoreReportsListStatus?.data?.data?.meta?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetRestoreReportsListStatus?.isFetching}
        isError={lazyGetRestoreReportsListStatus?.isError}
        isSuccess={lazyGetRestoreReportsListStatus?.isSuccess}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
