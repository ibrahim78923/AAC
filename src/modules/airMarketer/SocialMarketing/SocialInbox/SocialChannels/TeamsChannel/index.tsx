import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { Box, Typography } from '@mui/material';

import { socialSubChannelData } from '@/mock/modules/airMarketer/SocialMarketing/SocialInbox';

import { styles } from './TeamsChannel.style';
import { AddChannelIcon } from '@/assets/icons';
import { AIR_MARKETER } from '@/routesConstants/paths';

import { v4 as uuidv4 } from 'uuid';

const TeamsChannel = () => {
  const router = useRouter();
  return (
    <>
      <Box sx={styles.subChannels}>
        <Box
          onClick={() => router?.push(AIR_MARKETER.SOCIAL_INBOX_SETTINGS)}
          sx={{ cursor: 'pointer' }}
        >
          <AddChannelIcon />
        </Box>
        <Box sx={styles.subChannelBox}>
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
              <Typography variant="body3">{channel?.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TeamsChannel;
