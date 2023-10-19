import React from 'react';
import Search from '@/components/Search';
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { AvatarImage } from '@/assets/images';
import UserList from './UserList';

const Feed = () => {
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        mb={'36px'}
      >
        <Typography variant="subtitle1">Contact activity feed</Typography>
        <Search size="small" placeholder="Search" />
      </Box>
      <Typography variant="subtitle1" mb={'24px'}>
        Sample activity
      </Typography>
      {[1, 2, 3, 4, 5].map(() => (
        <UserList
          key={uuidv4()}
          img={AvatarImage}
          name={'umer malik'}
          email={'umar@gmail.com'}
          desc={'View Document Testing.pdf'}
          date={'22-03-2023'}
        />
      ))}
    </>
  );
};

export default Feed;
