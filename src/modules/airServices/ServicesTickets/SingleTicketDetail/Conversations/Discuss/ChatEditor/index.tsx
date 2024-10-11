import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useChatEditor } from './useChatEditor';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { Close, Send } from '@mui/icons-material';

export const ChatEditor = (props: any) => {
  const { selectedMessage, setSelectedMessage } = props;
  const {
    handleSubmit,
    method,
    submitMessage,
    postDiscussionsOfTicketConversationStatus,
    updateDiscussionsOfTicketConversationStatus,
  } = useChatEditor(props);

  return (
    <FormProvider methods={method} onSubmit={handleSubmit(submitMessage)}>
      {(selectedMessage?.isReply || selectedMessage?.isEdit) && (
        <Box
          bgcolor={'grey.700'}
          p={1.5}
          borderRadius={2}
          mb={0.6}
          mx={0.5}
          display={'flex'}
          gap={1}
          alignItems={'center'}
          borderLeft={'4px solid'}
          sx={{
            borderLeftColor: selectedMessage?.isReply
              ? 'success.main'
              : 'grey.600',
          }}
        >
          <Typography
            flex={1}
            variant="body2"
            color="grey.600"
            fontWeight="600"
            sx={{ wordBreak: 'break-all' }}
          >
            {!!selectedMessage?.reply
              ? selectedMessage?.reply
              : selectedMessage?.text}
          </Typography>
          <Close
            sx={{ cursor: 'pointer' }}
            onClick={() => setSelectedMessage?.({})}
          />
        </Box>
      )}
      <RHFTextField
        name="text"
        fullWidth
        placeholder="Type and press (Enter)"
        disabled={
          postDiscussionsOfTicketConversationStatus?.isLoading ||
          updateDiscussionsOfTicketConversationStatus?.isLoading
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                size="small"
                disabled={
                  postDiscussionsOfTicketConversationStatus?.isLoading ||
                  updateDiscussionsOfTicketConversationStatus?.isLoading
                }
              >
                <Send sx={{ cursor: 'pointer' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormProvider>
  );
};
