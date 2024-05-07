import { Button, DialogActions, Divider, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RHFEditor } from '@/components/ReactHookForm';
import { meetingFormFields } from './MeetingForm.data';
import { AttendeePeople } from './AttendeePeople';
import { useRouter } from 'next/router';

export const MeetingForm = (props: any) => {
  const router = useRouter();
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
                sx={item?.sx}
                key={item?.id}
              >
                <item.component {...item?.componentProps} />
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
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router?.back()}
        >
          Cancel
        </Button>
        <LoadingButton variant="contained" type="submit">
          Save & Next
        </LoadingButton>
      </DialogActions>
      <Divider />
    </>
  );
};
