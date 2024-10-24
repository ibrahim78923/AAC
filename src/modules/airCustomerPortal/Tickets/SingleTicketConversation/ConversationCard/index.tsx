import { DATE_TIME_FORMAT } from '@/constants';
import {
  formatFileSize,
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import { ShortcutSharpLeftIcon } from '@/assets/icons';
import { TICKET_CONVERSATIONS_TYPE } from '@/constants/strings';
import { ReplySingleTicketConversation } from '../ReplySingleTicketConversation';
import { CustomTooltip } from '@/components/CustomTooltip';
import { ConversationCardPropsI } from '../useSingleTicketConversation.interface';
import { CUSTOMER_PORTAL_TICKET_CONVERSATION_ACTIONS } from './ConversationCard.data';
import { otherDateFormat } from '@/lib/date-time';

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
        <Box display={'flex'} flex={0.33} gap={1} alignItems={'center'}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'primary.light',
            }}
            src={generateImage(data?.performedBy?.avatar?.url)}
          >
            <Typography
              variant="body2"
              textTransform={'uppercase'}
              color="slateBlue.main"
            >
              {fullNameInitial(
                data?.performedBy?.firstName,
                data?.performedBy?.lastName,
              )}
            </Typography>
          </Avatar>
          <Box>
            <Typography variant="body1" color="primary" fontWeight={600}>
              {fullName(data?.performedBy?.firstName)}
              <Typography
                variant="body2"
                component={'span'}
                color="slateBlue.main"
                fontWeight={600}
              >
                {' '}
                {`${
                  CUSTOMER_PORTAL_TICKET_CONVERSATION_ACTIONS[data?.type]
                }`}{' '}
              </Typography>
              {data?.recipients?.join?.(' ')}
            </Typography>
            <Typography variant="body3" fontWeight={400} color={'grey.900'}>
              {otherDateFormat(data?.createdAt, DATE_TIME_FORMAT?.UI)}
            </Typography>
          </Box>
        </Box>
        <Box
          display={'flex'}
          flex={0.33}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={1}
        >
          <Avatar
            src={generateImage(data?.attachment?.fileUrl)}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'primary.light',
            }}
          />
          <Box>
            <Typography variant="body2" color="slateBlue.main">
              {truncateText(data?.attachment?.orignalName)}
            </Typography>
            <Typography variant="body3" color="grey.500">
              {formatFileSize(data?.attachment?.fileSize)}
            </Typography>
          </Box>
        </Box>
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
