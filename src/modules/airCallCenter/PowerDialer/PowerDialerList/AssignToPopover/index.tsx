import React from 'react';
import { Box, Popover, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import { AvatarImage } from '@/assets/images';
import { SearchSharedIcon } from '@/assets/icons';
import { useAssignToPopover } from './useAssignToPopover';

const AssignToPopover = ({ title }: any) => {
  const { anchorEl, handleClick, handleClose, open, id } = useAssignToPopover();
  return (
    <div>
      <LoadingButton
        variant="text"
        sx={{ color: 'custom.main', fontWeight: 500 }}
        endIcon={<ArrowDropDownIcon />}
        startIcon={
          <Avatar
            src={AvatarImage.src}
            sx={{ color: 'common.black' }}
            alt="img"
          >
            Lao
          </Avatar>
        }
        onClick={handleClick}
      >
        {title}
      </LoadingButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ width: 297 }} p={1}>
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography fontWeight={600} color="custom.main">
              All user
            </Typography>
            <SearchSharedIcon />
          </Box>
          <Box
            p={1}
            bgcolor="grey.400"
            borderTop={'1px solid'}
            borderBottom={'1px solid'}
            borderColor="custom.off_white_three"
          >
            <Typography fontWeight={500} variant="body2" color="custom.main">
              {'Available (3)'}
            </Typography>
          </Box>
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              p={1}
              display="flex"
              alignItems="center"
              gap={1}
              borderBottom={'1px solid'}
              borderColor="custom.off_white_three"
            >
              <Avatar
                src={AvatarImage.src}
                alt="img"
                sx={{
                  width: 40,
                  height: 40,
                  color: 'common.black',
                }}
              >
                Lao
              </Avatar>
              <Typography fontWeight={500} variant="body2" color="custom.main">
                Jenny Wilson
              </Typography>
            </Box>
          ))}
        </Box>
      </Popover>
    </div>
  );
};

export default AssignToPopover;
