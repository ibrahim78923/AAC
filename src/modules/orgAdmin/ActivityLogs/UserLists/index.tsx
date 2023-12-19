import React from 'react';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { UserListI } from './UserList.interface';
import { styles, renderLabelColors } from './UserList.style';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

const UserLists = ({
  performedByName = '',
  moduleName,
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
              {/* This line is more modify WRF Backend data */}
              <Link href={`${performedBy}`}>
                {performedByName}
                <Box sx={{ textTransform: 'lowercase' }}>
                  has {label}{' '}
                  <Link href={`${moduleId}`} style={styles?.msg}>
                    {' '}
                    {moduleName}{' '}
                  </Link>
                </Box>
              </Link>

              {/* <a href(user_url/data.performedBy)>performByName </a> has data.activityType 
              <a href="moduleArray[data.module]/data.moduleId" > data.moduleName </a> */}
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
