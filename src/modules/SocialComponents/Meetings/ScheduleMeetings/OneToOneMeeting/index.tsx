import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useOneToOneMeeting } from './useOneToOneMeeting';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { MeetingForm } from './MeetingForm';

export const OneToOneMeeting = () => {
  const { methods, handleSubmit, onSubmit, handleMoveBack, meetingProps } =
    useOneToOneMeeting();
  return (
    <Box>
      <PageTitledHeader
        title="One to One Meeting"
        canMovedBack
        moveBack={handleMoveBack}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <MeetingForm {...meetingProps} />
      </FormProvider>
    </Box>
  );
};
