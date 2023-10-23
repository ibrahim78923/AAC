import React from 'react';

import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import { CallContainedIcon, InComingIcon, OutgoingIcon } from '@/assets/icons';
import { styles } from './CallsGrid.style';
import { callsContactsData } from '@/mock/modules/SocialComponents/Calling';

import { v4 as uuidv4 } from 'uuid';

const CallsGrid = () => {
  return (
    <Box
      sx={{
        mt: 1,
      }}
    >
      <Typography variant="body3" fontWeight="500" color={'#6B7280'}>
        My Contacts
      </Typography>

      <Box
        sx={{
          mt: 1,
        }}
      >
        {callsContactsData.map((item: any) => (
          <Box key={uuidv4()} sx={styles.callsCardWrapper}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Box>
                <Image src={item.userImage} alt="user" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="body2" fontWeight="600">
                  {item.userName}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  {item.callType === 'outgoing' && <OutgoingIcon />}
                  {item.callType === 'inComing' && <InComingIcon />}

                  <Typography variant="body2" fontWeight="400">
                    {item.callTime}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                filter: 'brightness(1) grayscale(1)',
              }}
            >
              <CallContainedIcon />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CallsGrid;
