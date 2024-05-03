import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { SOCIAL_COMPONENTS_EMAIL_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Checkbox, Typography } from '@mui/material';

export const timeSlotsDataArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const timeSlotsActionsDropdown = () => [
  ...timeSlotsDataArray?.map((month: any, index: number) => ({
    _id: index + 1,
    permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
    title: (
      <Box display={'flex'} alignItems={'center'} gap={0.5} key={month?._id}>
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
        />
        <Typography>{month}</Typography>
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
