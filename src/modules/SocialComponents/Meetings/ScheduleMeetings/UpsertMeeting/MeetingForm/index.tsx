import { DialogActions, Divider, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RHFEditor } from '@/components/ReactHookForm';
import { meetingFormFields } from './MeetingForm.data';
import { AttendeePeople } from './AttendeePeople';
import { useRouter } from 'next/router';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const MeetingForm = (props: any) => {
  const {
    addMeetingProgress,
    updateMeetingProgress,
    isLoading,
    isFetching,
    isError,
    meetingId,
    refetch,
  } = props;
  const router = useRouter();
  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;
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
            required={true}
          />
          <AttendeePeople {...props} />
        </Grid>
      </Grid>
      <br />
      <Divider sx={{ borderColor: 'grey.700' }} />
      <DialogActions>
        <LoadingButton
          variant="outlined"
          color="secondary"
          onClick={() => router?.back()}
          disabled={
            addMeetingProgress?.isLoading || updateMeetingProgress?.isLoading
          }
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          variant="contained"
          type="submit"
          disabled={
            addMeetingProgress?.isLoading || updateMeetingProgress?.isLoading
          }
          loading={
            addMeetingProgress?.isLoading || updateMeetingProgress?.isLoading
          }
        >
          {meetingId
            ? `${GENERIC_UPSERT_FORM_CONSTANT?.UPDATE}/ Next`
            : `${GENERIC_UPSERT_FORM_CONSTANT?.SAVE}/ Next`}
        </LoadingButton>
      </DialogActions>
      <Divider />
    </>
  );
};
