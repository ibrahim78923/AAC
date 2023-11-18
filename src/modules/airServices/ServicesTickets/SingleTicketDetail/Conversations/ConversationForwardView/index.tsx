import { Box, Grid, Typography, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShortcutSharpLeftIcon, ShortcutSharpRightIcon } from '@/assets/icons';
import { AvatarConversationImage } from '@/assets/images';
import { styles } from '../Conversation.styles';
import { conversationData } from '../Conversation.data';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

const ConversationForwardView = () => {
  const theme = useTheme();
  return (
    <Box marginTop={'1.25rem'}>
      {conversationData?.map((e: any) => (
        <Grid
          container
          justifyContent={'space-between'}
          sx={styles?.parent}
          mb={'1.25rem'}
          key={uuidv4()}
        >
          <Grid item xs={12} md={7} lg={5} paddingTop={`0 !important`}>
            <Box sx={styles?.leftSideParent}>
              <Box sx={styles?.imageBox}>
                <Image
                  src={AvatarConversationImage?.src}
                  alt="logo"
                  width={32}
                  height={32}
                />
                <Box>
                  <Typography variant="body1">
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
          <Grid item xs={12} md={3} lg={4} paddingTop={`0 !important`}>
            <Box sx={styles?.buttonBox}>
              <ShortcutSharpLeftIcon />
              <ShortcutSharpRightIcon />
              <Box
                sx={{
                  '&:hover': {
                    '.MuiSvgIcon-root': {
                      color: theme?.palette?.error?.main,
                    },
                  },
                }}
                className="iconContainer"
              >
                <DeleteIcon sx={{ color: `${theme?.palette?.custom?.main}` }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ConversationForwardView;
