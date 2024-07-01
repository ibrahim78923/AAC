import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { useTimeSlots } from './useTimeSlots';
import { EditWhiteBGPenIcon, PlusSharedColorIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

const TimeSlotsHeader = (props: any) => {
  const { disabled, setDisabled, timeSlotsData } = props;
  const { timeSlotsMonthsData } = useTimeSlots(props);
  return (
    <Box display={'flex'} gap={1} justifyContent={'right'}>
      <PermissionsGuard permissions={Permissions?.SOCIAL_COMPONENTS_EMAIL}>
        <SingleDropdownButton
          dropdownName={'Select Months'}
          dropdownOptions={timeSlotsMonthsData}
          disabled={disabled}
          menuSxProps={{ '.MuiPaper-root': { height: 300 } }}
        />
      </PermissionsGuard>
      <Button
        variant="contained"
        startIcon={
          timeSlotsData?.length ? (
            <PlusSharedColorIcon />
          ) : (
            <EditWhiteBGPenIcon />
          )
        }
        onClick={() => setDisabled?.(false)}
      >
        {timeSlotsData?.length ? 'Add Schedule' : 'Edit Schedule'}
      </Button>
    </Box>
  );
};

export default TimeSlotsHeader;
