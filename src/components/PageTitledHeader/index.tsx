import { Box, Button, Typography } from '@mui/material';
import { PlusSharedColorIcon, ImportIcon } from '@/assets/icons';
import { ExportButton } from '../Buttons/ExportButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { PageTitledHeaderPropsI } from './PageTitledHeader.interface';
import { Variant } from '@mui/material/styles/createTypography';

export const PageTitledHeader = (props: PageTitledHeaderPropsI) => {
  const {
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
    children,
    disableAddButton,
    titleColor = 'slateBlue.main',
    titleVariant = 'pageTitle',
    outerMarginBottom = 2,
    titleProps = {},
  } = props;

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
        mb={outerMarginBottom}
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
          <Typography
            variant={titleVariant as Variant}
            color={titleColor}
            {...titleProps}
          >
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
                className="small"
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
          {children}
          {!!addTitle?.length && (
            <PermissionsGuard permissions={createPermissionKey}>
              <Button
                className="small"
                disableElevation
                variant="contained"
                startIcon={hasStartIcon && <PlusSharedColorIcon />}
                endIcon={hasEndIcon && <PlusSharedColorIcon />}
                onClick={handleAction}
                disabled={disableAddButton}
              >
                {addTitle}
              </Button>
            </PermissionsGuard>
          )}
        </Box>
      </Box>
    </>
  );
};
