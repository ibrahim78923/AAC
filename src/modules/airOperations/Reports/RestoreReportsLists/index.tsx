import Search from '@/components/Search';
import { Box, Button, Typography } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { FilterIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useRestoreReportsLists } from './useRestoreReportsLists';
import { TIME_TO_RESTORE_DELETED_RECORD } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { RestoreReportsListsPropsI } from './RestoreReportsLists.interface';

export const RestoreReportsLists = (props: RestoreReportsListsPropsI) => {
  const { goBack, permissions } = props;
  const {
    restoreReportColumns,
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
    getRestoreReportsList,
    page,
  }: any = useRestoreReportsLists(props);

  return (
    <>
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid`}
        borderColor="custom.off_white_three"
      >
        <Box px={2}>
          <PageTitledHeader
            title={
              <>
                <Typography
                  variant="pageTitle"
                  color="slateBlue.main"
                  component={'div'}
                >
                  Restore Reports
                </Typography>

                <Typography
                  variant="body4"
                  color="slateBlue.main"
                  component={'div'}
                >
                  {`Restore Reports deleted in the last ${TIME_TO_RESTORE_DELETED_RECORD?.REPORT_RESTORE_IN_DAYS} days`}
                </Typography>
              </>
            }
            canMovedBack
            moveBack={() => goBack?.()}
          />
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={2}
            flexWrap={'wrap'}
          >
            <Box>
              <Search label="Search Here" setSearchBy={setSearch} />
            </Box>
            <Box display={'flex'} gap={2}>
              <PermissionsGuard permissions={permissions}>
                <SingleDropdownButton
                  dropdownOptions={actionButtonDropdown}
                  disabled={!!!selectedReportLists?.length}
                />
              </PermissionsGuard>
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
            </Box>
          </Box>
        </Box>
        <br />
        <TanstackTable
          columns={restoreReportColumns}
          data={
            lazyGetRestoreReportsListStatus?.data?.data?.genericReports ?? []
          }
          isLoading={lazyGetRestoreReportsListStatus?.isLoading}
          currentPage={lazyGetRestoreReportsListStatus?.data?.data?.meta?.page}
          count={lazyGetRestoreReportsListStatus?.data?.data?.meta?.pages}
          pageLimit={lazyGetRestoreReportsListStatus?.data?.data?.meta?.limit}
          totalRecords={
            lazyGetRestoreReportsListStatus?.data?.data?.meta?.total
          }
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetRestoreReportsListStatus?.isFetching}
          isError={lazyGetRestoreReportsListStatus?.isError}
          isSuccess={lazyGetRestoreReportsListStatus?.isSuccess}
          onPageChange={(page: number) => setPage(page)}
          isPagination
          errorProps={{
            canRefresh: true,
            refresh: () => getRestoreReportsList?.(page),
          }}
        />
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
