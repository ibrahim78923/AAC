import { Box, Chip, Typography, useTheme, Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Image from 'next/image';
import { AvatarImage } from '@/assets/images';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useState } from 'react';
import TicketInfoEdit from '../TicketInfoEdit';
import { AlertModals } from '@/components/AlertModals';

const appearanceStyle = (appearance: string) => {
  let color;

  switch (appearance) {
    case 'New':
      color = 'success';
      break;

    case 'Overdue':
      color = 'info';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
};

const priorityStyle = (priority: string) => {
  let color;

  switch (priority) {
    case 'Low':
      color = 'success';
      break;

    case 'Medium':
      color = 'warning';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
};

export const TicketInfoCard = ({ details }: any) => {
  const theme: any = useTheme();

  const [openDrawer, setOpenDrawer] = useState<HTMLButtonElement | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box
      mb={2}
      boxShadow={2}
      borderRadius={2}
      bgcolor={theme.palette.common.white}
      p={1}
    >
      <Box display={'flex'} justifyContent={'space-between'} mb={1.5}>
        <Box display={'flex'} marginBottom={0.5} alignItems={'center'} gap={1}>
          <Typography
            variant="body2"
            bgcolor={theme.palette.secondary.main}
            color={theme.palette.common.white}
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
                bgcolor: `${
                  theme['palette'][
                    `${appearanceStyle(details?.ticketAppearance)}`
                  ]['main']
                }`,
                color: theme.palette.common.white,
              }}
            />
          )}
          <MoreVertIcon onClick={handleClick} sx={{ cursor: 'pointer' }} />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ '& .MuiPopover-paper': { borderRadius: 3, width: '150px' } }}
          >
            <Typography
              sx={{
                px: 2,
                py: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: theme.palette.grey[700],
                },
              }}
              onClick={(event: any) => {
                setOpenDrawer(event.target);
                handleClose();
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
                  bgcolor: theme.palette.grey[700],
                },
              }}
              onClick={() => {
                setOpenDeleteModal(true);
                handleClose();
              }}
            >
              Delete
            </Typography>
          </Popover>
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
                  fill: `${
                    theme['palette'][`${priorityStyle(details?.priority)}`][
                      'main'
                    ]
                  }`,
                }}
              />
            }
          />
          <Box display={'flex'} alignItems={'center'} gap={0.2}>
            <AccessTimeFilledIcon sx={{ fill: theme.palette.warning.main }} />
            <Typography variant="body1" color={theme.palette.grey[900]}>
              Due in 1 day
            </Typography>
          </Box>
        </Box>
        <Image src={AvatarImage} alt="Avatar" />
      </Box>
      <TicketInfoEdit
        openDrawer={openDrawer}
        onClose={() => setOpenDrawer(null)}
      />

      <AlertModals
        message={'Are you sure you want to delete this ticket?'}
        type={'delete'}
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        handleSubmit={() => {}}
      />
    </Box>
  );
};
