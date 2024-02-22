import React, { useState } from 'react';

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import { ThreeDotsIcon } from '@/assets/icons';

import { styles } from '../Contacts.style';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

const GroupsCard = ({ info, setGroupModalType, setIsCreateModalOpen }: any) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleView = () => {
    setAnchorEl(null);
    setIsCreateModalOpen(true);
    setGroupModalType('view');
  };
  const handleEdit = () => {
    setAnchorEl(null);
    setIsCreateModalOpen(true);
    setGroupModalType('edit');
  };
  const handleDelete = () => {
    handleClose();
    setIsDeleteModal(true);
  };

  return (
    <>
      <Box sx={styles?.groupsCard}>
        <Typography variant="body1" fontWeight={600}>
          {info?.groupTitle}
        </Typography>
        <Typography variant="body1" fontSize={'12'}>
          Contacts ({info?.contacts})
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #E9EAEF',
            paddingTop: '8px',
            marginTop: '8px',
          }}
        >
          <AvatarGroup
            max={5}
            sx={{
              '& .MuiAvatar-colorDefault': {
                border: '2px solid #f8f8fa',
                backgroundColor: '#38CAB5 !important',
                fontSize: '12px',
                width: '25px !important',
                height: '25px !important',
              },
              '& .css-qv4cv0-MuiAvatar-root': {
                width: '25px !important',
                height: '25px !important',
              },
            }}
          >
            {info?.users?.map((user: any) => (
              <Avatar key={user?.id} src={user?.srcImage} />
            ))}
          </AvatarGroup>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={styles?.btnRounded}
          >
            <ThreeDotsIcon color="black" />
          </Button>
        </Box>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <AlertModals
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmitBtn={() => setIsDeleteModal(false)}
        message="Are you sure you want to delete this group?"
      />
    </>
  );
};

export default GroupsCard;
