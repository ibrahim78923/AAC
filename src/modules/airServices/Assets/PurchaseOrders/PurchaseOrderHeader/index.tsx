import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { ExportButton } from '@/components/Buttons/ExportButton';
import Search from '@/components/Search';
import { AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import { Box } from '@mui/material';

export const PurchaseOrderHeader = (props: any) => {
  const {
    deleteButtonDisabled,
    setSearchValue,
    onFilterClick,
    handleExcelExport,
    handleCsvExport,
    onDeleteClick,
  } = props;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      gap={1.5}
      px={2}
    >
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.SEARCH_AND_FILTER,
        ]}
      >
        <Search label="Search Here" setSearchBy={setSearchValue} />
      </PermissionsGuard>
      <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
        <CustomButton
          hasIcon={false}
          disabled={deleteButtonDisabled}
          onClick={() => onDeleteClick?.()}
        >
          Delete
        </CustomButton>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.EXPORT_PURCAHSE_ORDER,
          ]}
        >
          <ExportButton
            handleExcelExport={() => {
              handleExcelExport?.();
            }}
            handleCsvExport={() => {
              handleCsvExport?.();
            }}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS?.SEARCH_AND_FILTER,
          ]}
        >
          <CustomButton onClick={onFilterClick}>Filter</CustomButton>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
