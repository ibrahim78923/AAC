import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useUpsertMeeting } from './useUpsertMeeting';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { MeetingForm } from './MeetingForm';

export const UpsertMeeting = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    handleMoveBack,
    meetingProps,
    meetingType,
  } = useUpsertMeeting();
  return (
    <Box>
      <PageTitledHeader
        title={`${meetingType} Meeting`}
        canMovedBack
        moveBack={handleMoveBack}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <MeetingForm {...meetingProps} />
      </FormProvider>
    </Box>
  );
};
