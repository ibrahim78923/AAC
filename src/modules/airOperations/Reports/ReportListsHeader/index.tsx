import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { Box } from '@mui/material';
import { useReportListsHeader } from './useReportListsHeader';
import { reportListsActionComponent } from './ReportListsHeader.data';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { CUSTOM_BUTTON_TYPES } from '@/constants/mui-constant';

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
            <CustomButton
              iconType={CUSTOM_BUTTON_TYPES?.RESTORE}
              onClick={onRestoreClick}
            >
              Restore
            </CustomButton>
          </PermissionsGuard>
          <PermissionsGuard permissions={[permission?.FILTER_RECORD]}>
            <CustomButton onClick={openFilterPortal}>Filter</CustomButton>
          </PermissionsGuard>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        reportListsActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
