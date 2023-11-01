import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';

import {
  DeleteIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import { AvatarImageCoversation } from '@/assets/images';
import { styles } from './ConversationView.styles';
import { data } from './ConversationView.data';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

const ConversationView = () => {
  const theme: any = useTheme();
  return (
    <Box sx={{ mt: '50px' }}>
      {data.map((e: any) => (
        <Grid
          container
          justifyContent={'space-between'}
          sx={styles.parent}
          mb={'20px'}
          key={uuidv4()}
        >
          <Grid item xs={12} md={7} lg={5} paddingTop={`0 !important`}>
            <Box sx={styles.leftSideParent}>
              <Box sx={styles.imageBox}>
                <Image
                  src={AvatarImageCoversation.src}
                  alt="logo"
                  width={32}
                  height={32}
                />
                <Box>
                  <Typography sx={styles.imageHeading(theme)}>
                    <Typography
                      component="span"
                      color={theme?.palette?.primary?.main}
                    >
                      {e?.sender}
                    </Typography>{' '}
                    {e?.action === 'reply'
                      ? 'Replied  to'
                      : e?.action === 'note'
                      ? 'Added a private note'
                      : 'forwaded to'}{' '}
                    <Typography
                      component="span"
                      color={theme?.palette?.primary?.main}
                    >
                      {e?.action === 'note' ? null : e?.to}
                    </Typography>
                  </Typography>
                  <Typography sx={styles.date}>{e?.time}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={styles.message(theme)}>{e?.message}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={4} paddingTop={`0 !important`}>
            <Box sx={styles.buttonBox}>
              <ShortcutSharpLeftIcon />
              <ShortcutSharpRightIcon />
              <DeleteIcon />
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ConversationView;
