import { Box, Button, useTheme, Typography } from '@mui/material';
import { PlusSharedColorIcon, ImportIcon } from '@/assets/icons';
import { ExportButton } from '../ExportButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
}: any) => {
  const theme: any = useTheme();

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
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
          <Typography variant="h4" color={theme?.palette?.slateBlue?.main}>
            {title}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
          {hasImport && (
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<ImportIcon />}
              onClick={() => handleImport?.()}
            >
              Import
            </Button>
          )}
          {hasExport && (
            <ExportButton
              handleExcelExport={() => {
                handleExcelExport?.();
              }}
              handleCsvExport={() => {
                handleCsvExport?.();
              }}
            />
          )}
          {!!addTitle?.length && (
            <Button
              variant="contained"
              startIcon={<PlusSharedColorIcon />}
              onClick={handleAction}
            >
              {addTitle}
            </Button>
          )}
        </Box>
      </Box>
      <br />
    </>
  );
};
