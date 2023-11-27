import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import {
  AvatarConversationImage,
  NoAssociationFoundImage,
} from '@/assets/images';
import { styles } from '../Conversation.styles';
import NoData from '@/components/NoData';
import {
  ConversationSelectedValuesI,
  ConversationDataI,
} from '../Conversation.interface';
import { useConversationView } from './useConversationView';

const ConversationView: React.FC<{
  selectedValues: ConversationSelectedValuesI;
  handleEditClick: (conversationId: string, actionType: string) => void;
}> = ({ selectedValues }) => {
  const { conversationActionIcon, conversationNoteContent } =
    useConversationView();
  const theme = useTheme();

  const renderConversationItem = ([id, conversationData]: [
    string,
    ConversationDataI,
  ]) => {
    const actionType =
      conversationData?.note ||
      conversationData?.reply ||
      conversationData?.forward;

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
                  {Object?.entries(conversationNoteContent(conversationData))
                    ?.filter(([,]) => true)
                    ?.map(([, value]) => (
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
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    conversationData?.noteDescription ||
                    conversationData?.replyDescription ||
                    conversationData?.forwardDescription ||
                    'Unknown description',
                }}
              ></div>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} xs={12} paddingTop="0 !important">
          <Box sx={styles?.buttonBox}>{conversationActionIcon(actionType)}</Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box>
      {Object?.entries(selectedValues)?.length > 0 ? (
        <Grid container marginTop={2}>
          {Object?.entries(selectedValues)?.map(renderConversationItem)}
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
