import { DATE_TIME_FORMAT } from '@/constants';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Box } from '@mui/material';
import { ShortcutSharpLeftIcon } from '@/assets/icons';
import { TICKET_CONVERSATIONS_TYPE } from '@/constants/strings';
import { ReplySingleTicketConversation } from '../ReplySingleTicketConversation';
import { CustomTooltip } from '@/components/CustomTooltip';
import { ConversationCardPropsI } from '../useSingleTicketConversation.interface';
import { CUSTOMER_PORTAL_TICKET_CONVERSATION_ACTIONS } from './ConversationCard.data';
import { otherDateFormat } from '@/lib/date-time';
import { AttachFileCard } from '@/components/Avatars/AttachFileCard';
import { LogInfo } from '@/components/LogInfo';
import { UserInfo } from '@/components/UserInfo';

export const ConversationCard = (props: ConversationCardPropsI) => {
  const { data, isReplyOpen, setIsReplyOpen, singleTicketData } = props;

  return (
    <Box
      border={'3px solid'}
      borderColor={'custom.off_white_three'}
      p={2}
      borderRadius={2}
      my={2}
      boxShadow={1}
    >
      <Box
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        alignItems={'center'}
      >
        <Box flex={1}>
          <UserInfo
            boxProps={{ alignItems: 'normal' }}
            isNameCapital={false}
            nameProps={{
              fontWeight: 'fontWeightMedium',
              color: 'primary.main',
              variant: 'body2',
            }}
            avatarSize={{ height: 40, width: 40 }}
            name={
              <LogInfo
                performer={fullName(
                  data?.performedBy?.firstName,
                  data?.performedBy?.lastName,
                )}
                logType={
                  CUSTOMER_PORTAL_TICKET_CONVERSATION_ACTIONS?.[data?.type]
                }
                log={data?.recipients?.join?.(' ')}
                logProps={{ sx: { wordBreak: 'break-all' } }}
              />
            }
            email={otherDateFormat(data?.createdAt, DATE_TIME_FORMAT?.UI)}
            avatarSrc={data?.performedBy?.avatar?.url}
            nameInitial={fullNameInitial(
              data?.performedBy?.firstName,
              data?.performedBy?.lastName,
            )}
          />
        </Box>
        {!!data?.attachment?._id && (
          <Box flex={0.3}>
            <AttachFileCard
              size={{ width: 35, height: 35 }}
              hasStyling={false}
              canDelete={false}
              data={data?.attachment}
            />
          </Box>
        )}
        <Box display={'flex'} flex={0.33} justifyContent={'flex-end'} gap={1.5}>
          <CustomTooltip title="Reply">
            <Box
              onClick={() =>
                setIsReplyOpen({
                  data: data,
                  conversationType: TICKET_CONVERSATIONS_TYPE?.REPLY,
                  isOpen: true,
                })
              }
              sx={{ cursor: 'pointer' }}
            >
              <ShortcutSharpLeftIcon />
            </Box>
          </CustomTooltip>
        </Box>
      </Box>
      <Box my={1.5} fontWeight={600} maxHeight={'15vh'} overflow={'auto'}>
        <Box dangerouslySetInnerHTML={{ __html: data?.html }}></Box>
      </Box>
      {isReplyOpen?.isOpen && isReplyOpen?.data?._id === data?._id && (
        <ReplySingleTicketConversation
          isReplyOpen={isReplyOpen}
          setIsReplyOpen={setIsReplyOpen}
          singleTicketData={singleTicketData}
        />
      )}
    </Box>
  );
};
