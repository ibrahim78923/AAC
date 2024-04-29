import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFCheckbox } from '@/components/ReactHookForm';
import { Grid, Typography } from '@mui/material';

export const AllowAttendee = () => {
  return (
    <Grid container>
      <Grid item>
        <RHFCheckbox
          name="allowAttendee"
          label={
            <Typography variant="body1" color="primary.main">
              Allow Attendee To Set Meeting Time
            </Typography>
          }
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
        />
      </Grid>
    </Grid>
  );
};
