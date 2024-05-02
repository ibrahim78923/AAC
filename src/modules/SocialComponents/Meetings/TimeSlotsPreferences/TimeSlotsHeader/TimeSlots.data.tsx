import { RHFMultiCheckbox } from '@/components/ReactHookForm';
import { SOCIAL_COMPONENTS_EMAIL_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Button, Grid } from '@mui/material';

export const timeSlotsDataArray = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
];

export const monthsData = timeSlotsDataArray?.map((item: any) => ({
  value: item?.value,
  label: item?.label,
}));

export const timeSlotsActionsDropdown = () => [
  {
    _id: 1,
    permissionKey: [SOCIAL_COMPONENTS_EMAIL_PERMISSIONS?.APPLY_FILTER],
    title: (
      <Grid container>
        <Grid item>
          <RHFMultiCheckbox
            name="months"
            isCheckBox={true}
            options={monthsData}
            sx={{ width: '5px' }}
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
