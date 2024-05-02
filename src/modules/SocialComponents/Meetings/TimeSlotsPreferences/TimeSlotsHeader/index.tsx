import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { useTimeSlots } from './useTimeSlots';
import { PlusSharedColorIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

const TimeSlotsHeader = (props: any) => {
  const { disabled, setDisabled } = props;
  const { timeSlotsData } = useTimeSlots();
  return (
    <Box display={'flex'} gap={1} justifyContent={'right'}>
      <PermissionsGuard permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}>
        <SingleDropdownButton
          dropdownName={'Select Months'}
          dropdownOptions={timeSlotsData}
          disabled={disabled}
        />
      </PermissionsGuard>
      <Button
        variant="contained"
        startIcon={<PlusSharedColorIcon />}
        onClick={() => setDisabled?.(false)}
      >
        Add Schedule
      </Button>
    </Box>
  );
};

export default TimeSlotsHeader;
