import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  EditBlackIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import { AvatarImageConversation } from '@/assets/images';
import { styles } from '../Conversation.styles';
import {
  ConversationData,
  conversationAttachmentFileData,
} from '../Conversation.data';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { AttachFileCard } from '@/components/AttachFileCard';

const ConversationNoteView = () => {
  const theme: any = useTheme();
  return (
    <Box sx={{ mt: '50px' }}>
      {ConversationData?.map((e: any) => (
        <Grid
          container
          justifyContent={'space-between'}
          sx={styles?.parent}
          mb={'20px'}
          key={uuidv4()}
        >
          <Grid item xs={12} md={12} lg={5} paddingTop={`0 !important`}>
            <Box sx={styles?.leftSideParent}>
              <Box sx={styles?.imageBox}>
                <Image
                  src={AvatarImageConversation?.src}
                  alt="logo"
                  width={32}
                  height={32}
                />
                <Box>
                  <Typography sx={styles?.imageHeading(theme)}>
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
                  <Typography sx={styles?.date}>{e?.time}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={styles?.message(theme)}>
                  {e?.message}
                </Typography>
              </Box>
            </Box>
          </Grid>
          {conversationAttachmentFileData?.map((singleAttachment: any) => (
            <Grid item lg={3} md={12} key={uuidv4()}>
              <AttachFileCard data={singleAttachment} />
            </Grid>
          ))}
          <Grid item lg={4} md={3} paddingTop={`0 !important`}>
            <Box sx={styles?.buttonBox}>
              <ShortcutSharpLeftIcon />
              <ShortcutSharpRightIcon />
              <EditBlackIcon />
              <Box
                sx={{
                  '&:hover': {
                    '.MuiSvgIcon-root': {
                      color: 'red',
                    },
                  },
                }}
                className="iconContainer"
              >
                <DeleteIcon sx={{ color: '#6B7280' }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ConversationNoteView;
