import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import {
  EmailReplyIcon,
  ForwardIcon,
  ProfileCircleIcon,
  ReplyAllIcon,
} from '@/assets/icons';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './RightPane.styles';
import { emailsData } from '../Chat.data';

const RightPane = () => {
  return (
    <Box>
      <Box sx={styles?.rightSide}>
        <Search size="small" placeholder="Search Here" />
        <Box>
          <Button variant="outlined" sx={{ marginRight: '14px' }}>
            Email Settings
          </Button>
          <Button variant="contained">Send Email</Button>
        </Box>
      </Box>

      {emailsData?.length > 0 ? (
        emailsData?.map((obj: any) => (
          <Box key={uuidv4()} sx={styles?.rightSideCard}>
            {obj.userImg || <ProfileCircleIcon />}
            <Box flex={1}>
              <Box sx={styles?.emailWrap}>
                <Box flex={1} sx={{ cursor: 'pointer' }}>
                  <Typography variant="h5">{obj?.title}</Typography>
                  <Typography variant="body2">To: {obj?.to}</Typography>
                </Box>
                <Box display={'flex'} alignItems={'jcenter'} gap={'14px'}>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {obj?.date}
                  </Typography>
                  <IconButton size="small">
                    <ReplyAllIcon />
                  </IconButton>
                  <IconButton size="small">
                    <EmailReplyIcon />
                  </IconButton>
                  <IconButton size="small">
                    <ForwardIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2">{obj?.description}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Box sx={styles?.content}>
          <Typography variant="subtitle1">No Content to show!!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RightPane;
