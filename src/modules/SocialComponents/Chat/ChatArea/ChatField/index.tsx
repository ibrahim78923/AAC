import Image from 'next/image';

import { Box, useTheme, Typography, Divider } from '@mui/material';
import { styles } from './ChatField.style';
import { userAvatarImage } from '@/assets/images';

const ChatField = () => {
  const theme = useTheme();
  return (
    <Box sx={{ padding: '30px' }}>
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
        <Box sx={{ background: '#f3f3f366' }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Image width={30} height={30} src={userAvatarImage} alt="avatar" />
            <Box sx={styles.chatBoxWrapperInset}>
              Hi Michael <br /> Hope you are doing well.
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatField;
