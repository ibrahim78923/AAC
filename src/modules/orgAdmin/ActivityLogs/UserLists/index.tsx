import React from 'react';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { UserListI } from './UserList.interface';
import { styles, renderLabelColors } from './UserList.style';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

const UserLists = ({
  performedByName = '',
  moduleName,
  message,
  label = '',
  time,
  userImg,
  performedBy,
  moduleId,
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
              {performedByName.charAt(0)} {performedByName.charAt(1)}
            </Avatar>
            <Box>
              <Typography variant="body1">{performedByName}</Typography>
              <Typography variant="body2">
                {moduleName}
                <Typography variant="body2" sx={styles?.msg} component={'span'}>
                  {message}
                </Typography>
              </Typography>

              {/* This line is more modify WRF Backend data */}
              <Link href={`${performedBy}`}>
                {' '}
                {performedByName}
                has {label} <Link href={`${moduleId}`}>{moduleName}</Link>
              </Link>

              {/* <a href(user_url/performedBy)> {name.charAt(0)} {name.charAt(1)} </a> has label
                <a href="moduleArray[data.module]/moduleId" > moduleName </a> */}
            </Box>
          </Box>
          <Typography
            variant="body3"
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
