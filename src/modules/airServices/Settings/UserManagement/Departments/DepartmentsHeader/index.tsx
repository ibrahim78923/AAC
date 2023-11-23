import { Box, Button, Typography } from '@mui/material';
import { ArrowLeftIcon, PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { useDepartmentsHeader } from './useDepartmentsHeader';

export const DepartmentsHeader = () => {
  const { backArrowClick } = useDepartmentsHeader();
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box display={'flex'} gap={1}>
        <Box
          onClick={backArrowClick}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeftIcon />
        </Box>
        <Typography variant="h3">Departments</Typography>
      </Box>
      <Box display={'flex'} gap={2} alignItems={'center'}>
        <Search value="" placeholder="Search Here" />
        <Button startIcon={<PlusSharedColorIcon />} variant="contained">
          Add New Department
        </Button>
      </Box>
    </Box>
  );
};
