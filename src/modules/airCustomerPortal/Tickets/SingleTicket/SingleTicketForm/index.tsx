import {
  FormProvider,
  RHFDropZone,
  RHFEditor,
} from '@/components/ReactHookForm';
import { useSingleTicketForm } from './useSingleTicketForm';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const SingleTicketForm = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    postReplyToConversationEmailStatus,
  } = useSingleTicketForm(props);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFEditor
          name="yourReply"
          label="Your Reply"
          style={{ height: 150 }}
          required
        />
        <br />
        <RHFDropZone name="attachFile" fullWidth />
        <br />
        <Box textAlign={'end'}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={postReplyToConversationEmailStatus?.isLoading}
          >
            Send
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
};
