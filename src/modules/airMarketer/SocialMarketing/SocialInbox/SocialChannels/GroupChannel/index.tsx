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
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS } from '@/constants/permission-keys';

const GroupChannel = () => {
  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_MARKETER_SOCIAL_MARKETING_SOCIAL_INBOX_PERMISSIONS?.ADD_CHANNELS,
        ]}
      >
        <Box sx={styles?.channelsBox}>
          <AddChannelIcon />
          {socialChannelData?.map((channel) => (
            <Box key={uuidv4()}>
              <Image src={channel?.image} alt="Image" />
            </Box>
          ))}
        </Box>
      </PermissionsGuard>
      <Box sx={styles?.subChannels}>
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
    </>
  );
};

export default GroupChannel;
