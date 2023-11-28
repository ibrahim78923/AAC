import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';

import { ThreeDotsIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';

import { styles } from '../PostComments.style';

const ReComment = ({ reComment, item }: any) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        {/* <ReplyRoundedIcon /> */}
        &nbsp;
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={reComment?.userImage}
            width={20}
            height={20}
            alt="profile-image"
          />
          &nbsp;
          <Typography variant="body2">
            <strong style={{ color: '#000' }}>{item?.userName} :</strong>
            {reComment?.comment}
          </Typography>
        </Box>
        <Button
          sx={styles?.unStyledButton}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <ThreeDotsIcon color="black" />
        </Button>
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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            setIsDeleteModal(true), setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <AlertModals
        message={'Are you sure you want to delete this Comment?'}
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmit={() => setIsDeleteModal(false)}
      />
    </>
  );
};
export default ReComment;
