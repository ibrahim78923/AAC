import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { SOCIAL_COMPONENTS_EMAIL_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Checkbox, Typography } from '@mui/material';

export const timeSlotsWeeklyDataArray = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
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

export const timeSlotsWeeklyDropdown = () => [
  ...timeSlotsWeeklyDataArray?.map((days: any, index: number) => ({
    _id: index + 1,
    permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
    title: (
      <Box display={'flex'} alignItems={'center'} gap={0.5} key={days?._id}>
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
        />
        <Typography>{days}</Typography>
      </Box>
    ),
    handleClick: () => {},
  })),
  {
    _id: 22,
    permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
    title: (
      <Box ml={3}>
        <Button variant="contained">Apply</Button>
      </Box>
    ),
    handleClick: () => {},
  },
];
