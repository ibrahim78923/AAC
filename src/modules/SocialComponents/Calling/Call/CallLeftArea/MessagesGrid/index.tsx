import React from 'react';

import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import { callingChats } from '@/mock/modules/SocialComponents/Calling';

import { styles } from './MessagesGrid.style';

import { v4 as uuidv4 } from 'uuid';

const MessagesGrid = ({
  activeMessageData,
  setActiveMessageData,
  setIsActiveCalling,
}: any) => {
  return (
    <Box
      sx={{
        mt: 1,
      }}
    >
      <Typography
        variant="body3"
        fontWeight="500"
        color={'#6B7280'}
        sx={{ padding: '15px 15px 0px 15px ' }}
      >
        My Contacts
      </Typography>
      <Box
        sx={{
          mt: 1,
          maxHeight: '50vh',
          overflow: 'scroll',
        }}
      >
        {callingChats?.map((item: any) => {
          const activeCheck = activeMessageData?.id === item?.id;
          return (
            <>
              <Box
                key={uuidv4()}
                sx={styles?.chatsCardWrapper(activeCheck)}
                onClick={() => {
                  setActiveMessageData(item), setIsActiveCalling(false);
                }}
              >
                <Box sx={styles?.chatsCardInner}>
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Image
                      src={item?.userProfile}
                      alt="user-avatar"
                      width={40}
                      height={40}
                      style={{ borderRadius: '50%' }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {item?.userName}
                      </Typography>
                      <Typography variant="body3">{item?.lastRead}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body3">
                      {item?.lastMessageTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default MessagesGrid;
