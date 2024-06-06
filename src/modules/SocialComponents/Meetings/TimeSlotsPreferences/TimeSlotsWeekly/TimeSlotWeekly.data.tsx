import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { SOCIAL_COMPONENTS_EMAIL_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Checkbox, Typography } from '@mui/material';

export const timeSlotsWeeklyDataArray = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
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

export const timeSlotsWeeklyDropdown = (
  watchStart: any,
  watchEnd: any,
  setValue: any,
  timeSlotsState: any,
  setTimeSlotsState: any,
  dayIndex: any,
  handleAddTimeSlot: any,
) => {
  return [
    ...timeSlotsWeeklyDataArray?.map((days: any, idx: number) => ({
      _id: idx + 1,
      permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
      title: (
        <Box display={'flex'} alignItems={'center'} gap={0.5} key={days?._id}>
          <Checkbox
            icon={<CheckboxIcon />}
            checkedIcon={<CheckboxCheckedIcon />}
            checked={timeSlotsState?.includes(days)}
            onChange={() => {
              setTimeSlotsState((prev: any) =>
                !prev?.includes(days)
                  ? [...prev, days]
                  : prev?.filter((item: any) => item !== days),
              );
            }}
          />
          <Typography>{days}</Typography>
        </Box>
      ),
    })),
    {
      _id: 22,
      permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
      title: (
        <Box ml={3}>
          <Button
            variant="contained"
            onClick={() => {
              timeSlotsState?.forEach((day: any) => {
                const selectedDayIndex = timeSlotsWeeklyDataArray?.indexOf(day);
                setValue(
                  `timeSlot[${selectedDayIndex}].slots[${dayIndex}].start`,
                  watchStart,
                );
                setValue(
                  `timeSlot[${selectedDayIndex}].slots[${dayIndex}].end`,
                  watchEnd,
                );
                handleAddTimeSlot(selectedDayIndex);
              });
            }}
          >
            Apply
          </Button>
        </Box>
      ),
    },
  ];
};
