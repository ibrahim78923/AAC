import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFCheckbox } from '@/components/ReactHookForm';
import { SOCIAL_COMPONENTS_EMAIL_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Typography } from '@mui/material';

export const timeSlotsWeeklyDataArray = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const timeSlotsWeeklyDropdown = ({
  startHour,
  endHour,
  setValue,
  daySlotsState,
  setDaySlotsState,
  index,
}: any) => {
  const updateDayTimeRanges = () => {
    daySlotsState?.forEach((selectedDay: any) => {
      const selectedDayIndex = timeSlotsWeeklyDataArray?.indexOf(selectedDay);
      const startHourPath = `daysTimeRanges.${selectedDayIndex}.timeRanges.${index}.startHour`;
      const endHourPath = `daysTimeRanges.${selectedDayIndex}.timeRanges.${index}.endHour`;
      setValue(startHourPath, startHour);
      setValue(endHourPath, endHour);
    });
  };

  const handleCheckboxChange = (day: any) => {
    const updatedState = daySlotsState?.includes(day)
      ? daySlotsState?.filter((item: any) => item !== day)
      : [...daySlotsState, day];
    setDaySlotsState(updatedState);
  };

  return [
    ...timeSlotsWeeklyDataArray?.map((day: any, idx: number) => ({
      _id: idx + 1,
      permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
      title: (
        <Box display="flex" alignItems="center" gap={0.5} key={day}>
          <RHFCheckbox
            icon={<CheckboxIcon />}
            checkedIcon={<CheckboxCheckedIcon />}
            checked={daySlotsState?.includes(day)}
            onChange={() => handleCheckboxChange(day)}
          />
          <Typography>{day}</Typography>
        </Box>
      ),
    })),
    {
      _id: 22,
      permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
      title: (
        <Box ml={3}>
          <Button variant="contained">Apply</Button>
        </Box>
      ),
      handleClick: (close: any) => {
        updateDayTimeRanges();
        close();
      },
    },
  ];
};
