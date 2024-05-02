import { RHFMultiCheckbox } from '@/components/ReactHookForm';
import { SOCIAL_COMPONENTS_EMAIL_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Grid } from '@mui/material';

export const timeSlotsWeeklyDataArray = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

export const timeSlotsWeeklyData = [
  { day: 'Sun' },
  { day: 'Mon' },
  { day: 'Tue' },
  { day: 'Wed' },
  { day: 'Thu' },
  { day: 'Fri' },
  { day: 'Sat' },
];

export const weeklyData = timeSlotsWeeklyDataArray?.map((item: any) => ({
  value: item?.value,
  label: item?.label,
}));

export const timeSlotsWeeklyDropdown = () => [
  {
    _id: 1,
    permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
    title: (
      <Grid container>
        <Grid item>
          <RHFMultiCheckbox
            name="weekly"
            isCheckBox={true}
            options={weeklyData}
            sx={{ width: '10px' }}
          />
          <Box pt={1} display={'flex'} justifyContent={'center'}>
            <Button variant="contained">Apply</Button>
          </Box>
        </Grid>
      </Grid>
    ),
    handleClick: () => {},
  },
];

export const defaultValues = () => {
  return {
    months: [],
    weekly: [],
    timeSlot: [
      {
        timeSlotStart: '',
      },
      {
        timeSlotEnd: '',
      },
    ],
  };
};
