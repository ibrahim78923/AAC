import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { FilterIcon, RestoreIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { useReportListsHeader } from './useReportListsHeader';
import { reportListsActionComponent } from './ReportListsHeader.data';

export const ReportListsHeader = () => {
  const {
    isPortalOpen,
    handleSetSearch,
    selectedReportsList,
    reportListsActionDropdown,
    openFilterPortal,
    onRestoreClick,
    permission,
  } = useReportListsHeader();

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
            <Search label="Search Here" setSearchBy={handleSetSearch} />
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
              dropdownOptions={reportListsActionDropdown}
              disabled={!!!selectedReportsList?.length}
              className="small"
            />
          </PermissionsGuard>
          <PermissionsGuard permissions={[permission?.RESTORE_RECORD]}>
            <Button
              className="small"
              variant="outlined"
              color="inherit"
              startIcon={<RestoreIcon />}
              onClick={onRestoreClick}
            >
              Restore
            </Button>
          </PermissionsGuard>
          <PermissionsGuard permissions={[permission?.FILTER_RECORD]}>
            <Button
              className="small"
              variant="outlined"
              color="inherit"
              startIcon={<FilterIcon />}
              onClick={openFilterPortal}
            >
              Filter
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        reportListsActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
