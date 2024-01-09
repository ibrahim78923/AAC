import {
  Box,
  Chip,
  Typography,
  useTheme,
  Popover,
  Avatar,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import Image from 'next/image';
// import { AvatarImage } from '@/assets/images';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { AlertModals } from '@/components/AlertModals';
import { Fragment, useState } from 'react';
import {
  ticketInfoCardAppearanceColor,
  ticketInfoCardPriorityColor,
} from './TicketInfoCard.data';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { TICKETS_ACTION_CONSTANTS } from '../../TicketsLists.data';
import dayjs from 'dayjs';
import { IMG_URL } from '@/config';
import { pxToRem } from '@/utils/getFontValue';

export const TicketInfoCard = ({
  details,
  setTicketAction,
  setSelectedTicketList,
}: any) => {
  const theme: any = useTheme();

  const router = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const truncatedDescription = details?.description
    ? details?.description.length > 60
      ? `${details.description.slice(0, 60)}...`
      : details?.description
    : '-';

  return (
    <Fragment>
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
              src={`${IMG_URL}${details?.departmentsDetails?.departmenProfilePicture}`}
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
                }}
              />
            )}
            <MoreVertIcon
              onClick={(event: any) => {
                event.stopPropagation();
                setAnchorEl(event?.currentTarget);
              }}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </Box>
        <Box
          dangerouslySetInnerHTML={{
            __html: truncatedDescription,
          }}
          fontSize={'14px'}
        />
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mt={1.5}
        >
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <Chip
              label={details?.pirority}
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
              <AccessTimeFilledIcon
                sx={{ fill: theme?.palette?.warning?.main }}
                fontSize={'small'}
              />
              <Typography
                variant="body3"
                color={theme?.palette?.custom?.steel_blue_alpha}
              >
                Due in {dayjs(details?.plannedEndDate).diff(dayjs(), 'day')} day
              </Typography>
            </Box>
          </Box>
          <Avatar
            sx={{ bgcolor: theme?.palette?.primary?.main }}
            style={{ width: 20, height: 20 }}
            src={`${IMG_URL}${details?.requesterDetails?.requesterProfilePicture}`}
          >
            <Typography fontSize={pxToRem(10)} textTransform={'uppercase'}>
              {details?.requesterDetails?.firstName?.[0] ?? '-'}
              {details?.requesterDetails?.lastName?.[0]}
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
            setOpenDeleteModal(true);
            setAnchorEl(null);
          }}
        >
          Delete
        </Typography>
      </Popover>

      <AlertModals
        message={'Are you sure you want to delete this ticket?'}
        type={'delete'}
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        handleSubmit={() => {}}
      />
    </Fragment>
  );
};
