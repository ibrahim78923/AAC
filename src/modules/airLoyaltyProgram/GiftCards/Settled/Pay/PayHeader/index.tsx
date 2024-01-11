import { EyeIcon } from '@/assets/icons';
import { Box, Button, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ExportButton } from '@/components/ExportButton';

export const PayHeader = () => {
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box>
        <Typography variant="h4">Shops</Typography>
      </Box>
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
        <EyeIcon />
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
        <ExportButton />
      </Box>
    </Box>
  );
};
