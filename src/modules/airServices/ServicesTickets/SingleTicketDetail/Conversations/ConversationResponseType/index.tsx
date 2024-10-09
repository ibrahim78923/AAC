import { CustomTooltip } from '@/components/CustomTooltip';
import { Box, IconButton } from '@mui/material';
import { ArticleModalIcon, CannedResponseModalIcon } from '@/assets/icons';
import { useAppDispatch } from '@/redux/store';
import { setIsResponsePortalOpen } from '@/redux/slices/airServices/ticket-conversation/slice';
import { TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT } from '../Conversations.data';

export const ConversationResponseType = () => {
  const dispatch = useAppDispatch();

  const setAction = (action: string) => {
    dispatch(
      setIsResponsePortalOpen<any>({
        isOpen: true,
        action,
      }),
    );
  };

  return (
    <Box
      display={'flex'}
      gap={0.5}
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'flex-end'}
    >
      <CustomTooltip title="add canned response">
        <IconButton
          onClick={() =>
            setAction?.(
              TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT?.CANNED_RESPONSE,
            )
          }
          sx={{ cursor: 'pointer' }}
        >
          <CannedResponseModalIcon />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip title="add article">
        <IconButton
          onClick={() =>
            setAction?.(
              TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT?.ARTICLE_REPONSE,
            )
          }
          sx={{ cursor: 'pointer' }}
        >
          <ArticleModalIcon />
        </IconButton>
      </CustomTooltip>
    </Box>
  );
};
