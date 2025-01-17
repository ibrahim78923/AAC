import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { FilterIcon } from '@/assets/icons';
import { ExportButton } from '@/components/Buttons/ExportButton';
import Search from '@/components/Search';
import { AIR_SERVICES_ASSETS_PURCAHSE_ORDER_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button } from '@mui/material';

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
        <Button
          variant="outlined"
          color="secondary"
          disabled={deleteButtonDisabled}
          onClick={() => onDeleteClick?.()}
          className={'small'}
        >
          Delete
        </Button>
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
          <Button
            variant="outlined"
            onClick={() => onFilterClick?.()}
            size="large"
            startIcon={<FilterIcon />}
            color="secondary"
            className={'small'}
          >
            Filter
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
