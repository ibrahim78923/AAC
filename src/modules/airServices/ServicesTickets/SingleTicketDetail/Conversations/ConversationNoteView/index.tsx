import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  EditBlackIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import { AvatarConversationImage } from '@/assets/images';
import { styles } from '../Conversation.styles';
import {
  conversationData,
  conversationAttachmentFileData,
} from '../Conversation.data';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { AttachFileCard } from '@/components/AttachFileCard';

const ConversationNoteView = () => {
  const theme: any = useTheme();
  return (
    <Box marginTop={'50px'}>
      {conversationData?.map((e: any) => (
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
                  src={AvatarConversationImage?.src}
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
            <Grid
              item
              xs={12}
              paddingTop={`0 !important`}
              sx={{
                display: { lg: 'none', xs: 'block' },
                mt: {
                  lg: 0,
                  xs: 2,
                },
              }}
            >
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
                  <DeleteIcon color={theme?.palette?.custom.main} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          {conversationAttachmentFileData?.map((singleAttachment: any) => (
            <Grid
              item
              lg={3}
              md={12}
              key={uuidv4()}
              sx={{
                mt: {
                  lg: 0,
                  xs: 2,
                },
              }}
            >
              <AttachFileCard data={singleAttachment} />
            </Grid>
          ))}

          <Grid
            item
            lg={4}
            md={3}
            paddingTop={`0 !important`}
            sx={{ display: { lg: 'block', xs: 'none' } }}
          >
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
                <DeleteIcon color={theme?.palette?.custom.main} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ConversationNoteView;
