import React from 'react';
import Image from 'next/image';

import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useMemberDetails from './useMemberDetails';

const MemberDetails = (props: any) => {
  const {
    theme,
    setIsTeamDrawer,
    setIsOpenDelete,
    anchorEl,
    open,
    handleClick,
    handleClose,
  } = useMemberDetails();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
          paddingBottom: '1rem',
          marginY: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Image src={props?.img} alt="--" width={40} height={40} />
          <Box sx={{ display: 'grid' }}>
            <Typography
              variant="body3"
              sx={{
                fontWeight: 500,
                color: `${theme?.palette?.blue?.dull_blue}`,
              }}
            >
              {props?.name}
            </Typography>
            <Typography
              variant="body3"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.custom?.steel_blue_alpha}`,
              }}
            >
              {props?.email}
            </Typography>
            <Typography
              variant="body3"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.custom?.steel_blue_alpha}`,
              }}
            >
              {props?.designation}
            </Typography>
          </Box>
        </Box>

        <Button
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <KeyboardArrowDownIcon
            sx={{ color: `${theme?.palette?.custom?.main}` }}
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setIsTeamDrawer(false);
            }}
          >
            Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setIsTeamDrawer(false);
              setIsOpenDelete(true);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default MemberDetails;
