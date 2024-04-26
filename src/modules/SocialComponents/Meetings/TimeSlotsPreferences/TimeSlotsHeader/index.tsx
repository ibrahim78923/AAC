import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { useTimeSlots } from './useTimeSlots';
import { PlusSharedColorIcon } from '@/assets/icons';

const TimeSlotsHeader = () => {
  const { timeSlotsData } = useTimeSlots();
  return (
    <Box display={'flex'} gap={1} justifyContent={'right'}>
      <SingleDropdownButton
        dropdownName={'Select Months'}
        dropdownOptions={timeSlotsData}
      />
      <Button variant="contained" startIcon={<PlusSharedColorIcon />}>
        Add Schedule
      </Button>
    </Box>
  );
};

export default TimeSlotsHeader;
