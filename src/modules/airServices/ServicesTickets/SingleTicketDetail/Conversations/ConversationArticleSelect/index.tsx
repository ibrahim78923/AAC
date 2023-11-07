import React, { useState } from 'react';
import { Dialog, IconButton, DialogTitle, useTheme } from '@mui/material';
import {
  ArticleModalIcon,
  CannedResponseModalIcon,
  CloseDrawerIcon,
} from '@/assets/icons';
import { Box } from '@mui/material';
import ConversationCannedResponse from '../ConversationCannedResponse';
import ConversationAddArticle from '../ConversationAddArticle';

function ConversationArticleSelect() {
  const theme = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState({
    component: null,
    title: '',
  });

  const handleCannedResponseClick = () => {
    setSelectedComponent({
      component: (
        <ConversationCannedResponse
          onAddButtonClick={(selectedTitle) =>
            handleAddButtonClick(selectedTitle)
          }
        />
      ),
      title: 'Canned Response Modal',
    });
    setIsModalOpen(true);
  };

  const handleArticleClick = () => {
    setSelectedComponent({
      component: (
        <ConversationAddArticle
          onAddContractButtonClick={(selectedTitle) =>
            handleAddButtonClick(selectedTitle)
          }
        />
      ),
      title: 'Article Modal',
    });
    setIsModalOpen(true);
  };

  const handleAddButtonClick = (selectedTitle) => {
    selectedTitle;
    setIsModalOpen(false);
  };

  return (
    <div>
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
            color: (theme) => theme?.palette?.grey[500],
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
    </div>
  );
}

export default ConversationArticleSelect;
