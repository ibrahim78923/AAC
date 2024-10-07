import { Box, Chip, Typography, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { AIR_SERVICES } from '@/constants';
import { pxToRem } from '@/utils/getFontValue';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useTicketInfoCard from './useTicketInfoCard';
import {
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { UserInfo } from '@/components/UserInfo';
import { RENDER_COLOR } from '../TicketsBoardView.data';
import { TICKET_STATUS } from '@/constants/strings';

export const TicketInfoCard = (props: any) => {
  const { details } = props;

  const {
    theme,
    router,
    openMessage,
    resolvedMessage,
    pendingMessage,
    closedMessage,
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
              <Chip
                size="small"
                label={details?.state}
                sx={{
                  bgcolor: RENDER_COLOR?.[details?.state] ?? 'error.main',
                  color: 'common.white',
                  textTransform: 'capitalize',
                }}
              />
            )}
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
                AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS,
              ]}
            >
              <SingleDropdownButton
                dropdownOptions={singleTicketBoardViewDropdownOptions?.(
                  details,
                )}
                dropdownName={<MoreVertIcon />}
                hasEndIcon={false}
                btnVariant="text"
              />
            </PermissionsGuard>
          </Box>
        </Box>
        <Typography variant={'body2'}>
          {truncateText(details?.subject)}
        </Typography>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mt={1.5}
        >
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <Chip
              label={details?.pirority ?? '-'}
              size="small"
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
                    {resolvedMessage}
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
                    {closedMessage}
                  </Typography>
                </>
              ) : null}
            </Box>
          </Box>
          <Avatar
            sx={{ bgcolor: theme?.palette?.primary?.main }}
            style={{ width: 20, height: 20 }}
            src={generateImage(details?.requesterDetails?.avatar?.url)}
          >
            <Typography fontSize={pxToRem(10)} textTransform={'uppercase'}>
              {fullNameInitial(
                details?.requesterDetails?.firstName,
                details?.requesterDetails?.lastName,
              )}
            </Typography>
          </Avatar>
        </Box>
      </Box>
    </>
  );
};
