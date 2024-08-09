import {
  FormProvider,
  RHFDropZone,
  RHFEditor,
} from '@/components/ReactHookForm';
import { useReplySingleTicketConversation } from './useReplySingleTicketConversation';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const ReplySingleTicketConversation = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    postReplyForCustomerTicketConversationStatus,
    closeReply,
  } = useReplySingleTicketConversation(props);

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
        <Box justifyContent={'flex-end'} display={'flex'} gap={2}>
          <LoadingButton
            variant="outlined"
            color="inherit"
            type="button"
            disabled={postReplyForCustomerTicketConversationStatus?.isLoading}
            onClick={() => closeReply?.()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={postReplyForCustomerTicketConversationStatus?.isLoading}
          >
            Send
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
};
