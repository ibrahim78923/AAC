import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFCheckbox } from '@/components/ReactHookForm';
import { SOCIAL_COMPONENTS_EMAIL_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Typography } from '@mui/material';

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

export const timeSlotsActionsDropdown = (
  selectedMonths: any,
  setSelectedMonths: any,
) => {
  const handleCheckboxChange = (month: any) => {
    setSelectedMonths((prev: any) => {
      if (prev?.includes(month)) {
        return prev?.filter((item: any) => item !== month);
      } else {
        return [...prev, month];
      }
    });
  };

  return [
    ...timeSlotsDataArray?.map((month: any, index: number) => ({
      _id: index + 1,
      permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
      title: (
        <Box display={'flex'} alignItems={'center'} gap={0.5} key={month?._id}>
          <RHFCheckbox
            name={'months'}
            icon={<CheckboxIcon />}
            checkedIcon={<CheckboxCheckedIcon />}
            checked={selectedMonths?.includes(month)}
            onChange={() => handleCheckboxChange(month)}
          />
          <Typography>{month}</Typography>
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
        setSelectedMonths(selectedMonths);
        close();
      },
    },
  ];
};
