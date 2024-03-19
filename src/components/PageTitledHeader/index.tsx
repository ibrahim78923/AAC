import { Box, Button, Typography } from '@mui/material';
import { PlusSharedColorIcon, ImportIcon } from '@/assets/icons';
import { ExportButton } from '../ExportButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const PageTitledHeader = ({
  title,
  hasImport = false,
  hasExport = false,
  addTitle,
  handleAction = () => {},
  handleExcelExport,
  handleCsvExport,
  moveBack,
  canMovedBack,
  handleImport,
  hasStartIcon = true,
  hasEndIcon = false,
  createPermissionKey,
  exportPermissionKey,
  importPermissionKey,
}: any) => {
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
          {canMovedBack && (
            <ArrowBackIcon
              color={'secondary'}
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                moveBack?.();
              }}
            />
          )}
          <Typography variant="h4" color="SlateBlue.main">
            {title}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
          {hasImport && (
            <PermissionsGuard permissions={importPermissionKey}>
              <Button
                color="secondary"
                variant="outlined"
                startIcon={<ImportIcon />}
                onClick={() => handleImport?.()}
              >
                Import
              </Button>
            </PermissionsGuard>
          )}
          {hasExport && (
            <PermissionsGuard permissions={exportPermissionKey}>
              <ExportButton
                handleExcelExport={() => {
                  handleExcelExport?.();
                }}
                handleCsvExport={() => {
                  handleCsvExport?.();
                }}
              />
            </PermissionsGuard>
          )}
          {!!addTitle?.length && (
            <PermissionsGuard permissions={createPermissionKey}>
              <Button
                disableElevation
                variant="contained"
                startIcon={hasStartIcon && <PlusSharedColorIcon />}
                endIcon={hasEndIcon && <PlusSharedColorIcon />}
                onClick={handleAction}
              >
                {addTitle}
              </Button>
            </PermissionsGuard>
          )}
        </Box>
      </Box>
      <br />
    </>
  );
};
