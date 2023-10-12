import Image from 'next/image';

import { Box, useTheme, Typography, Divider } from '@mui/material';

import ChatFooter from './ChatFooter';

import { chatsData } from '@/mock/modules/SocialComponents/Chat';

import { CharmTickIcon, ThreeDotsIcon } from '@/assets/icons';

import { styles } from './ChatField.style';
import { v4 as uuidv4 } from 'uuid';

const ChatField = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ padding: '30px', height: '60vh' }}>
        <Box>
          <Box sx={styles.timeSlot(theme)}>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.custom.grayish_blue }}
            >
              Sep 09
            </Typography>
          </Box>
          <Divider
            sx={{ borderColor: theme.palette.grey[700], marginTop: '-14px' }}
          />
        </Box>

        <Box sx={{ paddingTop: '30px' }}>
          {chatsData.map((item: any) => (
            <>
              <Box key={uuidv4()}>
                <Box sx={styles.mainChatArea(item.role)}>
                  <Box sx={{ marginBottom: '25px' }}>
                    <Image
                      width={30}
                      height={30}
                      src={item.userImage}
                      alt="avatar"
                    />
                  </Box>
                  <Box sx={styles.chatMessageArea(item.role)}>
                    <Box>
                      <Box sx={styles.chatBoxWrapperInset(theme, item.role)}>
                        <Typography
                          variant="body3"
                          dangerouslySetInnerHTML={{ __html: item.message }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            right: '5px',
                            bottom: '0px',
                          }}
                        >
                          <CharmTickIcon />
                        </Box>
                        {item.chatReaction && (
                          <Box
                            sx={styles.chatReaction}
                            dangerouslySetInnerHTML={{
                              __html: item.chatReaction,
                            }}
                          />
                        )}
                        <Box sx={styles.sendReaction}></Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body3" sx={{ color: '#6E7191' }}>
                          {item.timeStamp}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: 'flex', gap: '10', marginBottom: '20px' }}
                    >
                      <ThreeDotsIcon
                        color={theme.palette.custom.grayish_blue}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </Box>
      <ChatFooter />
    </>
  );
};

export default ChatField;
