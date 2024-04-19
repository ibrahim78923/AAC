import { DATE_TIME_FORMAT } from '@/constants';
import {
  formatFileSize,
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  EditBlackIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import { CONVERSATION_TYPE_MODIFY } from '../Conversations.data';
import { TICKET_CONVERSATIONS_TYPE } from '@/constants/strings';

export const ConversationCard = (props: any) => {
  const { data, setSelectedConversationType } = props;
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
                {`${CONVERSATION_TYPE_MODIFY[data?.type]?.description}`}{' '}
              </Typography>
              {data?.recipients?.join?.(' ')}
            </Typography>
            <Typography variant="body3" fontWeight={400} color={'grey.900'}>
              {dayjs()?.format(DATE_TIME_FORMAT?.UI)}
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
            src={generateImage(data?.attachments?.fileUrl)}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'primary.light',
            }}
          />
          <Box>
            <Typography variant="body2" color="slateBlue.main">
              {truncateText(data?.attachments?.orignalName)}
            </Typography>
            <Typography variant="body3" color="grey.500">
              {formatFileSize(data?.attachments?.fileSize)}
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} flex={0.33} justifyContent={'flex-end'} gap={1.5}>
          <Box
            onClick={() =>
              setSelectedConversationType({
                ...data,
                conversationType: TICKET_CONVERSATIONS_TYPE?.REPLY,
                isOpen: true,
              })
            }
            sx={{ cursor: 'pointer' }}
          >
            <ShortcutSharpLeftIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setSelectedConversationType({
                ...data,
                conversationType: TICKET_CONVERSATIONS_TYPE?.FORWARD,
                isOpen: true,
              })
            }
          >
            <ShortcutSharpRightIcon />
          </Box>
          {data?.type === TICKET_CONVERSATIONS_TYPE?.NOTE && (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                setSelectedConversationType({
                  ...data,
                  conversationType: data?.type,
                  isOpen: true,
                  isEdit: true,
                })
              }
            >
              <EditBlackIcon />
            </Box>
          )}
          {data?.type === TICKET_CONVERSATIONS_TYPE?.NOTE && (
            <DeleteIcon
              onClick={() =>
                setSelectedConversationType({
                  ...data,
                  isDelete: true,
                })
              }
              sx={{
                color: 'custom.main',
                cursor: 'pointer',
                '&:hover': {
                  color: 'error.main',
                },
              }}
            />
          )}
        </Box>
      </Box>
      <Box mt={1.5} fontWeight={600} maxHeight={'15vh'} overflow={'auto'}>
        <Box dangerouslySetInnerHTML={{ __html: data?.html }}></Box>
      </Box>
    </Box>
  );
};
