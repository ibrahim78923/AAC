import { CustomTooltip } from '@/components/CustomTooltip';
import { Box } from '@mui/material';
import { ArticleModalIcon, CannedResponseModalIcon } from '@/assets/icons';
import { useAppDispatch } from '@/redux/store';
import { setIsResponsePortalOpen } from '@/redux/slices/airServices/ticket-conversation/slice';
import { TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT } from '../Conversations.data';
import { CustomIconButton } from '@/components/Buttons/CustomIconButton';

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
        <CustomIconButton
          onClick={() =>
            setAction?.(
              TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT?.CANNED_RESPONSE,
            )
          }
          customStyles={{ cursor: 'pointer' }}
        >
          <CannedResponseModalIcon />
        </CustomIconButton>
      </CustomTooltip>
      <CustomTooltip title="add article">
        <CustomIconButton
          onClick={() =>
            setAction?.(
              TICKET_CONVERSATION_RESPONSE_PORTAL_ACTIONS_CONSTANT?.ARTICLE_REPONSE,
            )
          }
          customStyles={{ cursor: 'pointer' }}
        >
          <ArticleModalIcon />
        </CustomIconButton>
      </CustomTooltip>
    </Box>
  );
};
