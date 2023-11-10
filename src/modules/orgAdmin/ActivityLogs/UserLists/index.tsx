import React from 'react';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { UserListI } from './UserList.interface';
import { styles, renderLabelColors } from './UserList.style';
import { v4 as uuidv4 } from 'uuid';

const UserLists = ({
  name = '',
  desc,
  message,
  label = '',
  time,
  userImg,
}: UserListI) => {
  return (
    <Box key={uuidv4()} sx={styles?.customWrapper()}>
      <Box sx={styles?.wrapper}>
        <Box sx={styles?.leftSide(useTheme())}>
          <Typography variant="body2" sx={styles?.leftText}>
            {time}
          </Typography>
        </Box>
        <Box sx={styles?.rightSide(useTheme())}>
          <Box display={'flex'} alignItems={'center'} gap={'16px'}>
            <Avatar
              src={userImg?.src}
              sx={{ ...styles?.avatar, ...renderLabelColors[label] }}
            >
              {name.charAt(0)} {name.charAt(1)}
            </Avatar>
            <Box>
              <Typography variant="body1">{name}</Typography>
              <Typography variant="body2">
                {desc}
                <Typography variant="body2" sx={styles?.msg} component={'span'}>
                  {message}
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Typography
            component={'span'}
            sx={{ ...styles?.label(useTheme()), ...renderLabelColors[label] }}
          >
            {label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserLists;
