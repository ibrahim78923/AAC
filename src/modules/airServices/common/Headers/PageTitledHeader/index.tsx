import { Box, Button, useTheme, Typography } from '@mui/material';
import { PlusSharedIconColor, ImportIcon } from '@/assets/icons';
import { ExportButton } from '../../Buttons/ExportButton';

export const PageTitledHeader = ({
  title,
  hasImport = false,
  hasExport = false,
  addTitle,
  handleAction = () => {},
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
        <Typography variant="h4" color={theme?.palette?.slateBlue?.main}>
          {title}
        </Typography>
        <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
          {hasImport && (
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<ImportIcon />}
            >
              Import
            </Button>
          )}
          {hasExport && <ExportButton />}

          <Button
            variant="contained"
            startIcon={<PlusSharedIconColor />}
            onClick={handleAction}
          >
            {addTitle}
          </Button>
        </Box>
      </Box>
      <br />
    </>
  );
};
