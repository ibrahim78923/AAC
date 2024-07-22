import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useUpsertMeeting } from './useUpsertMeeting';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { MeetingForm } from './MeetingForm';
import EmailTemplate from './EmailTemplate';

export const UpsertMeeting = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    handleMoveBack,
    meetingProps,
    meetingType,
    meetingTemplate,
  } = useUpsertMeeting();
  return (
    <Box>
      {!meetingTemplate ? (
        <PageTitledHeader
          title={`${meetingType} Meeting`}
          canMovedBack
          moveBack={handleMoveBack}
        />
      ) : null}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!meetingTemplate ? (
          <MeetingForm {...meetingProps} />
        ) : (
          <>
            <EmailTemplate />
          </>
        )}
      </FormProvider>
    </Box>
  );
};
