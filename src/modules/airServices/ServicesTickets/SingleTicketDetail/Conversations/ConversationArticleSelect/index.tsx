import React from 'react';
import { Dialog, IconButton, DialogTitle } from '@mui/material';
import {
  ArticleModalIcon,
  CannedResponseModalIcon,
  CloseDrawerIcon,
} from '@/assets/icons';
import { Box } from '@mui/material';
import { useConversationArticleSelect } from './useConversationArticleSelect';

const ConversationArticleSelect = () => {
  const {
    handleCannedResponseClick,
    handleArticleClick,
    isModalOpen,
    setIsModalOpen,
    theme,
    selectedComponent,
  }: any = useConversationArticleSelect();

  return (
    <Box>
      <Box onClick={handleCannedResponseClick}>
        <CannedResponseModalIcon />
      </Box>
      <Box onClick={handleArticleClick}>
        <ArticleModalIcon />
      </Box>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme?.palette?.grey?.[500],
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <CloseDrawerIcon />
        </IconButton>
        <DialogTitle color={theme?.palette?.slateBlue?.main}>
          {selectedComponent?.title}
        </DialogTitle>

        {selectedComponent?.component}
      </Dialog>
    </Box>
  );
};

export default ConversationArticleSelect;
