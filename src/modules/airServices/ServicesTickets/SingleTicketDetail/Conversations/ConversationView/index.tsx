import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import {
  AvatarConversationImage,
  NoAssociationFoundImage,
} from '@/assets/images';

import {
  DeleteIcon,
  EditBlackIcon,
  ShortcutSharpLeftIcon,
  ShortcutSharpRightIcon,
} from '@/assets/icons';
import { styles } from '../Conversation.styles';
import NoData from '@/components/NoData';
import {
  ConversationSelectedValuesI,
  ConversationDataI,
} from '../Conversation.interface';

const ConversationView: React.FC<{
  selectedValues: ConversationSelectedValuesI;
}> = ({ selectedValues }) => {
  const theme = useTheme();

  const renderNoteContent = (conversationData: ConversationDataI) => {
    const content: { [key: string]: string } = {};

    for (const key in conversationData) {
      if (
        key !== 'noteDescription' &&
        key !== 'replyDescription' &&
        key !== 'forwardDescription' &&
        conversationData[key]
      ) {
        content[key] = `${key}: ${conversationData[key]}`;
      }
    }

    return content;
  };

  const renderConversationItem = ([id, conversationData]: [
    string,
    ConversationDataI,
  ]) => {
    return (
      <Grid
        container
        justifyContent="space-between"
        sx={styles?.parent}
        mb="1.25rem"
        key={id}
      >
        <Grid item md={8} xs={12} paddingTop="0 !important">
          <Box sx={styles?.leftSideParent}>
            <Box
              display="flex"
              sx={{ flexDirection: { md: 'row', xs: 'column' } }}
            >
              <Image
                src={AvatarConversationImage?.src}
                alt="logo"
                width={32}
                height={32}
              />
              <Box sx={{ ml: { md: 2, xs: 0 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { md: 'row', xs: 'column' },
                    mt: { md: 0, xs: 2 },
                  }}
                >
                  {Object.entries(renderNoteContent(conversationData))
                    .filter(([,]) => true)
                    .map(([, value]) => (
                      <Typography
                        key={uuidv4()}
                        component="span"
                        sx={{ mr: 1 }}
                        color={theme?.palette?.primary?.main}
                      >
                        {value}
                      </Typography>
                    ))}
                </Box>
                <Typography sx={styles?.date}>
                  11:02 PM-5 March, 2023
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={styles?.message(theme)}>
                {conversationData.noteDescription ||
                  conversationData.replyDescription ||
                  conversationData.forwardDescription ||
                  'Unknown description'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} xs={12} paddingTop="0 !important">
          <Box sx={styles?.buttonBox}>
            <ShortcutSharpRightIcon />
            <EditBlackIcon />
            <ShortcutSharpLeftIcon />

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
              <DeleteIcon color={theme?.palette?.custom?.main} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box>
      {Object.entries(selectedValues).length > 0 ? (
        <Grid container sx={styles?.parent}>
          {Object.entries(selectedValues).map(renderConversationItem)}
        </Grid>
      ) : (
        <NoData
          message="There are no selected conversations"
          image={NoAssociationFoundImage}
        />
      )}
    </Box>
  );
};

export default ConversationView;
