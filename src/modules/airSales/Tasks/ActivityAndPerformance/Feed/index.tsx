import React from 'react';
import Search from '@/components/Search';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { AvatarImage } from '@/assets/images';
import UserList from './UserList';

const Feed = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        mb={'28px'}
      >
        <Typography variant="subtitle1">Contact activity feed</Typography>
        <Search size="small" width={'216px'} placeholder="Search" />
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="body2">Select Task</Typography>
        <Select labelId="" id="demo-simple-select">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

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
