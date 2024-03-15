import { Box, Chip, Typography, Popover, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { AlertModals } from '@/components/AlertModals';
import {
  ticketInfoCardAppearanceColor,
  ticketInfoCardPriorityColor,
} from './TicketInfoCard.data';
import { AIR_SERVICES } from '@/constants';
import { TICKETS_ACTION_CONSTANTS } from '../../TicketsLists.data';
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

export const TicketInfoCard = ({
  details,
  setTicketAction,
  setSelectedTicketList,
  totalRecords,
  setPage,
  getValueTicketsListData,
  page,
}: any) => {
  const {
    openDeleteModal,
    setOpenDeleteModal,
    open,
    anchorEl,
    setAnchorEl,
    id,
    theme,
    router,
    OPEN,
    openMessage,
    RESOLVED,
    resolvedMessage,
    PENDING,
    pendingMessage,
    CLOSED,
    closedMessage,
    setDeleteId,
    handleSubmitDelete,
    deleteTicketsStatus,
  } = useTicketInfoCard({
    details,
    setPage,
    totalRecords,
    getValueTicketsListData,
    page,
  });

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
        <Box display={'flex'} justifyContent={'space-between'} mb={1.5}>
          <Box
            display={'flex'}
            marginBottom={0.5}
            alignItems={'center'}
            gap={1}
          >
            <Avatar
              sx={{
                bgcolor: theme?.palette?.primary?.main,
                borderRadius: 1.25,
              }}
              style={{ width: 20, height: 20 }}
              src={generateImage(
                details?.departmentsDetails?.departmenProfilePicture,
              )}
            >
              <Typography fontSize={pxToRem(10)} textTransform={'uppercase'}>
                {details?.departmentsDetails?.name?.slice(0, 2) ?? '-'}
              </Typography>
            </Avatar>
            <Typography
              variant={'body2'}
              color={'custom.main'}
              fontWeight={500}
            >
              {details?.ticketIdNumber}
            </Typography>
          </Box>
          <Box display={'flex'} marginBottom={0.5} alignItems={'center'}>
            {!!details?.state && (
              <Chip
                size="small"
                label={details?.state}
                sx={{
                  bgcolor: `${theme?.['palette']?.[
                    `${ticketInfoCardAppearanceColor(details?.state)}`
                  ]?.['main']}`,
                  color: theme?.palette?.common?.white,
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
              <MoreVertIcon
                onClick={(event: any) => {
                  event.stopPropagation();
                  setAnchorEl(event?.currentTarget);
                }}
                sx={{ cursor: 'pointer' }}
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
                      `${ticketInfoCardPriorityColor(details?.pirority)}`
                    ]?.['main']}`,
                  }}
                />
              }
            />
            <Box display={'flex'} alignItems={'center'} gap={0.2}>
              {details?.status === OPEN ? (
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
              ) : details?.status === RESOLVED ? (
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
              ) : details?.status === PENDING ? (
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
              ) : details?.status === CLOSED ? (
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
                details?.requesterDetails?.firstName?.[0],
                details?.requesterDetails?.lastName?.[0],
              )}
            </Typography>
          </Avatar>
        </Box>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': { borderRadius: 3, width: '9rem' },
        }}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
          ]}
        >
          <Typography
            sx={{
              px: 2,
              py: 1,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: theme?.palette?.grey?.[700],
              },
            }}
            onClick={() => {
              setSelectedTicketList([details?._id]);
              setTicketAction(TICKETS_ACTION_CONSTANTS?.EDIT_TICKET);
              setAnchorEl(null);
            }}
          >
            Edit
          </Typography>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS]}
        >
          <Typography
            sx={{
              px: 2,
              py: 1,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: theme?.palette?.grey?.[700],
              },
            }}
            onClick={() => {
              setDeleteId([details?._id]);
              setOpenDeleteModal(true);
              setAnchorEl(null);
            }}
          >
            Delete
          </Typography>
        </PermissionsGuard>
      </Popover>

      <AlertModals
        message={'Are you sure you want to delete this ticket?'}
        type={'delete'}
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        handleSubmitBtn={handleSubmitDelete}
        loading={deleteTicketsStatus?.isLoading}
        disableCancelBtn={deleteTicketsStatus?.isLoading}
      />
    </>
  );
};
