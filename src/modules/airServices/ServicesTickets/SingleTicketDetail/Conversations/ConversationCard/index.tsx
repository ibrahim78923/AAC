import { DATE_TIME_FORMAT } from '@/constants';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  EditBlackIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import {
  TICKET_CONVERSATION_ACTIONS,
  TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT,
} from '../Conversations.data';
import { TICKET_CONVERSATIONS_TYPE } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { UserInfo } from '@/components/UserInfo';
import { LogInfo } from '@/components/DataDisplay/LogInfo';
import { AttachFileCard } from '@/components/Avatars/AttachFileCard';
import { otherDateFormat } from '@/lib/date-time';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';

export const ConversationCard = (props: any) => {
  const { data, setAction } = props;
  return (
    <Box
      border={'3px solid'}
      borderColor={'custom.off_white_three'}
      p={2}
      borderRadius={2}
      mb={2}
      boxShadow={1}
    >
      <Box
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
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
                logType={TICKET_CONVERSATION_ACTIONS?.[data?.type]}
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
        <Box display={'flex'} flex={0.25} justifyContent={'flex-end'} gap={1.5}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_REPLY,
            ]}
          >
            <Box
              onClick={() =>
                setAction?.(
                  TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.REPLY,
                  data,
                )
              }
              sx={{ cursor: 'pointer' }}
            >
              <ShortcutSharpLeftIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_FARWARD,
            ]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                setAction?.(
                  TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.FORWARD,
                  data,
                )
              }
            >
              <ShortcutSharpRightIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_NOTE,
            ]}
          >
            {data?.type === TICKET_CONVERSATIONS_TYPE?.NOTE && (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setAction?.(
                    TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.EDIT_NOTE,
                    data,
                  )
                }
              >
                <EditBlackIcon />
              </Box>
            )}
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_DELETE_NOTE,
            ]}
          >
            {data?.type === TICKET_CONVERSATIONS_TYPE?.NOTE && (
              <Delete
                onClick={() =>
                  setAction?.(
                    TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.DELETE_NOTE,
                    data,
                  )
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
          </PermissionsGuard>
        </Box>
      </Box>
      {!!data?.html ? <HtmlRenderer description={data?.html} /> : '---'}
    </Box>
  );
};
