import { Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useTicketInfoCard from './useTicketInfoCard';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { UserInfo } from '@/components/UserInfo';
import { RENDER_COLOR } from '../TicketsBoardView.data';
import { TICKET_STATUS, TICKET_TYPE } from '@/constants/strings';
import { TruncateText } from '@/components/TruncateText';
import { AIR_SERVICES } from '@/constants/routes';
import { formatTimeDifference } from '@/lib/date-time';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { CustomChip } from '@/components/Chip/CustomChip';

export const TicketInfoCard = (props: any) => {
  const { details } = props;

  const {
    theme,
    router,
    openMessage,
    pendingMessage,
    singleTicketBoardViewDropdownOptions,
  } = useTicketInfoCard(props);

  return (
    <>
      <Box
        mb={2}
        boxShadow={2}
        borderRadius={2}
        bgcolor={'common.white'}
        p={1}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          router?.push({
            pathname: AIR_SERVICES?.TICKETS_LIST,
            query: {
              ticketId: details?._id,
            },
          });
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'} mb={1}>
          <UserInfo
            nameInitial={fullNameInitial(details?.departmentsDetails?.name)}
            name={details?.ticketIdNumber}
            avatarSrc={details?.attachment?.fileUrl}
            nameProps={{
              color: 'custom.bright',
              fontWeight: 'fontWeightSmall',
            }}
            avatarSize={{ variant: 'rounded', height: 20, width: 20 }}
          />
          <Box display={'flex'} marginBottom={0.5} alignItems={'center'}>
            {!!details?.state && (
              <CustomChip
                size="small"
                label={details?.state}
                isCapital
                backgroundColor={RENDER_COLOR?.[details?.state] ?? 'error'}
              />
            )}
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
                AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS,
              ]}
            >
              <Box>
                <SingleDropdownButton
                  dropdownOptions={singleTicketBoardViewDropdownOptions?.(
                    details,
                  )}
                  dropdownName={<MoreVertIcon />}
                  hasEndIcon={false}
                  btnVariant="text"
                />
              </Box>
            </PermissionsGuard>
          </Box>
        </Box>
        <Typography variant={'body2'} color="slateBlue.main" component={'div'}>
          {details?.ticketType === TICKET_TYPE?.SR ? (
            <TruncateText
              text={details?.subject}
              retainTextLeft="Request For: "
            />
          ) : (
            <TruncateText text={details?.subject} />
          )}
        </Typography>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mt={1.5}
        >
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <CustomChip
              label={details?.pirority?.toLowerCase() ?? '---'}
              size="small"
              isCapital
              color="default"
              icon={
                <FiberManualRecordIcon
                  fontSize={'medium'}
                  sx={{
                    fill: `${theme?.['palette']?.[
                      `${RENDER_COLOR?.[details?.pirority] ?? 'error'}`
                    ]?.['main']}`,
                  }}
                />
              }
            />
            <Box display={'flex'} alignItems={'center'} gap={0.2}>
              {details?.status === TICKET_STATUS?.OPEN ? (
                <>
                  <AccessTimeFilledIcon
                    sx={{ fill: theme?.palette?.warning?.main }}
                    fontSize={'small'}
                  />
                  <Typography
                    variant="body3"
                    color={theme?.palette?.custom?.steel_blue_alpha}
                  >
                    {openMessage}
                  </Typography>
                </>
              ) : details?.status === TICKET_STATUS?.RESOLVED ? (
                <>
                  <CheckCircleIcon
                    sx={{ fill: theme?.palette?.custom?.dark }}
                    fontSize={'small'}
                  />
                  <Typography
                    variant="body3"
                    color={theme?.palette?.custom?.dark}
                  >
                    ResolvedAt: {formatTimeDifference(details?.resolvedAt)}
                  </Typography>
                </>
              ) : details?.status === TICKET_STATUS?.PENDING ? (
                <>
                  <AccessTimeFilledIcon
                    sx={{ fill: theme?.palette?.primary?.main }}
                    fontSize={'small'}
                  />
                  <Typography
                    variant="body3"
                    color={theme?.palette?.custom?.steel_blue_alpha}
                  >
                    {pendingMessage}
                  </Typography>
                </>
              ) : details?.status === TICKET_STATUS?.CLOSED ? (
                <>
                  <CheckCircleIcon
                    sx={{ fill: theme?.palette?.custom?.dark }}
                    fontSize={'small'}
                  />
                  <Typography
                    variant="body3"
                    color={theme?.palette?.custom?.dark}
                  >
                    Closed:
                    {formatTimeDifference(details?.closedAt)}
                  </Typography>
                </>
              ) : null}
            </Box>
          </Box>
          <CustomAvatar
            avatarSrc={details?.requesterDetails?.avatar?.url}
            nameInitial={fullNameInitial(
              details?.requesterDetails?.firstName,
              details?.requesterDetails?.lastName,
            )}
            tooltipTitle={`Requester: ${fullName(
              details?.requesterDetails?.firstName,
              details?.requesterDetails?.lastName,
            )}`}
          />
        </Box>
      </Box>
    </>
  );
};
