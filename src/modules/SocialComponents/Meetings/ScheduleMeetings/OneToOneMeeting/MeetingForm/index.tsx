import { Button, DialogActions, Divider, Grid } from '@mui/material';
import { meetingFormFields } from './MeetingForm.data';
import { RHFEditor } from '@/components/ReactHookForm';
import { AttendeePeople } from './AttendeePeople';
import { LoadingButton } from '@mui/lab';

export const MeetingForm = (props: any) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={8} xs={12}>
          <Grid container spacing={2}>
            {meetingFormFields(props)?.map((item: any) => (
              <Grid
                item
                lg={item?.lg}
                md={item?.md}
                sm={item?.sm}
                xs={12}
                key={item?.id}
              >
                <item.component
                  {...item?.componentProps}
                  fullWidth
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={4} xs={12}>
          <RHFEditor
            name="description"
            label="Meeting Agenda"
            style={{ minHeight: 200 }}
          />
          <AttendeePeople {...props} />
        </Grid>
      </Grid>
      <br />
      <Divider sx={{ borderColor: 'grey.700' }} />
      <DialogActions>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <LoadingButton variant="contained">Save</LoadingButton>
      </DialogActions>
      <Divider />
    </>
  );
};
