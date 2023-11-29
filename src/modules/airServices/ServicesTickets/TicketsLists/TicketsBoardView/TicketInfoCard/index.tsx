import { Box, Chip, Typography, useTheme, Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Image from 'next/image';
import { AvatarImage } from '@/assets/images';
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
            <Typography
              variant="body2"
              bgcolor={'secondary.main'}
              color={'common.white'}
              borderRadius={1}
              px={0.5}
            >
              {details?.department}
            </Typography>
            <Typography variant="caption">{details?.ticketId}</Typography>
          </Box>
          <Box display={'flex'} marginBottom={0.5} alignItems={'center'}>
            {!!details?.ticketAppearance && (
              <Chip
                size="small"
                label={details?.ticketAppearance}
                sx={{
                  bgcolor: `${theme?.['palette']?.[
                    `${ticketInfoCardAppearanceColor(
                      details?.ticketAppearance,
                    )}`
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
        <Typography variant="body1">{details?.ticketMessage}</Typography>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          mt={1.5}
        >
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <Chip
              label={details?.priority}
              size="small"
              icon={
                <FiberManualRecordIcon
                  fontSize={'medium'}
                  sx={{
                    fill: `${theme?.['palette']?.[
                      `${ticketInfoCardPriorityColor(details?.priority)}`
                    ]?.['main']}`,
                  }}
                />
              }
            />
            <Box display={'flex'} alignItems={'center'} gap={0.2}>
              <AccessTimeFilledIcon
                sx={{ fill: theme?.palette?.warning?.main }}
              />
              <Typography variant="body1" color={theme?.palette?.grey?.[900]}>
                Due in 1 day
              </Typography>
            </Box>
          </Box>
          <Image src={AvatarImage} alt="Avatar" />
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
