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
import { RightSideData } from '../Chat.interface';
import { styles } from './RightSide.styles';

const RightSide = (props: RightSideData) => {
  const {
    title,
    data = [],
    handleReplayAll = () => {},
    handleForward = () => {},
    handleReplay = () => {},
    emailSettingProps = {},
    sendEmailProps,
    searchProps,
    handleContactModal,
  } = props;

  return (
    <Box>
      <Box sx={styles?.rightSide}>
        <Search size="small" placeholder="Search Here" {...searchProps} />
        <Box>
          <Button
            variant="outlined"
            sx={{ marginRight: '14px' }}
            {...emailSettingProps}
          >
            Email Settings
          </Button>
          <Button variant="contained" {...sendEmailProps}>
            Send Email
          </Button>
        </Box>
      </Box>
      {title && <Typography>{title}</Typography>}

      {data?.length > 0 ? (
        data?.map((obj) => (
          <Box key={uuidv4()} sx={styles?.rightSideCard}>
            {obj.userImg || <ProfileCircleIcon />}
            <Box flex={1}>
              <Box sx={styles?.emailWrap}>
                <Box
                  flex={1}
                  sx={{ cursor: 'pointer' }}
                  onClick={handleContactModal}
                >
                  <Typography variant="h5">{obj?.title}</Typography>
                  <Typography variant="body2">To: {obj?.to}</Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'14px'}>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {obj?.date}
                  </Typography>
                  <IconButton size="small" onClick={() => handleReplayAll(obj)}>
                    <ReplyAllIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleReplay(obj)}>
                    <EmailReplyIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleForward(obj)}>
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

export default RightSide;
