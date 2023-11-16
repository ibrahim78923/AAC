import React from 'react';

import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import {
  socialChannelData,
  socialSubChannelData,
} from '@/mock/modules/airMarketer/SocialMarketing/SocialInbox';

import { AddChannelIcon } from '@/assets/icons';

import { styles } from './GroupChannel.style';
import { v4 as uuidv4 } from 'uuid';

const GroupChannel = () => {
  return (
    <>
      <Box sx={styles.channelsBox}>
        <AddChannelIcon />
        {socialChannelData?.map((channel) => (
          <Box key={uuidv4()}>
            <Image src={channel?.image} alt="Image" />
          </Box>
        ))}
      </Box>
      <Box sx={styles.subChannels}>
        {socialSubChannelData?.map((channel) => (
          <Box
            key={uuidv4()}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <Image src={channel?.image} alt="Image" width={24} height={24} />
            <Typography variant="body3">{channel.name}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default GroupChannel;
