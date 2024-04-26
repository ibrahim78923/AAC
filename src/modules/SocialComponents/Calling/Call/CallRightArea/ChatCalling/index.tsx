import React, { useEffect, useRef } from 'react';

import Image from 'next/image';

import { Box, TextField, Typography, useTheme } from '@mui/material';

import UserDetailCard from '../../UserDetailCard';

import { SendLiftedIcon } from '@/assets/icons';

import { styles } from './ChatCalling.style';

import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CALLING_PERMISSIONS } from '@/constants/permission-keys';

const ChatCalling = ({
  activeMessageData,
  setIsActiveCalling,
  setActiveCallsSelectedData,
}: any) => {
  const theme = useTheme();
  const chatContainerRef = useRef<any>(null);
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [activeMessageData]);

  return (
    <Box>
      <UserDetailCard
        image={activeMessageData?.userProfile}
        name={activeMessageData?.userName}
        phone={activeMessageData?.userPhone}
        handelCall={() => {
          setIsActiveCalling(true),
            setActiveCallsSelectedData(activeMessageData);
        }}
      />
      <Box sx={styles?.chatAreaWrapper} ref={chatContainerRef}>
        {activeMessageData?.messages &&
          activeMessageData?.messages?.map((item: any) => (
            <Box sx={styles?.chatInnerBox(item?.type)} key={uuidv4()}>
              <Box sx={styles?.chatBox}>
                {item?.type === 'receiver' && (
                  <Box sx={styles?.userImageWrapper}>
                    <Image
                      src={activeMessageData?.userProfile}
                      width={40}
                      height={40}
                      style={{ borderRadius: '50%' }}
                      alt="user-profile"
                    />
                  </Box>
                )}
                <Box sx={styles?.chatBoxInset(item?.type)}>
                  <Box sx={styles?.chatHead}>
                    <Typography variant="body2" fontWeight={600}>
                      {item?.ownerName}
                    </Typography>
                    <Typography
                      variant="body3"
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.time}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body3"
                      color={theme?.palette?.custom?.grayish_blue}
                    >
                      {item?.message}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
      <Box sx={styles?.chatFooter}>
        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_CALLING_PERMISSIONS?.SEND_MESSAGE]}
        >
          <Box sx={styles?.chatFooterInset}>
            <TextField placeholder="Write message" sx={styles?.chatTextarea} />
            <SendLiftedIcon />
          </Box>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};

export default ChatCalling;
