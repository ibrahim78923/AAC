import React, { useState } from 'react';
import { Box, Dialog, IconButton, DialogTitle } from '@mui/material';
import {
  ArticleModalIcon,
  CannedResponseModalIcon,
  CloseDrawerIcon,
} from '@/assets/icons';
import ConversationSelectModal from '../ConversationSelectModal';
import { UseConversation } from '../useConversation';

function ConversationArticleSelect() {
  const { theme, filteredContent, searchTerm, setSearchTerm } =
    UseConversation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState({
    title: '',
  });

  const handleIconClick = (title) => {
    setSelectedComponent({
      title,
    });
    setIsModalOpen(true);
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Box onClick={() => handleIconClick('Add Canned Response')}>
        <CannedResponseModalIcon />
      </Box>
      <Box onClick={() => handleIconClick('Add New Article')}>
        <ArticleModalIcon />
      </Box>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme?.palette?.grey?.[500],
          }}
          onClick={handleCloseModal}
        >
          <CloseDrawerIcon />
        </IconButton>
        <DialogTitle color={theme?.palette?.slateBlue?.main}>
          {selectedComponent?.title}
        </DialogTitle>

        <ConversationSelectModal
          theme={theme}
          onAddButtonClick={handleAddButtonClick}
          filteredContent={filteredContent}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          title={selectedComponent?.title}
        />
      </Dialog>
    </Box>
  );
}

export default ConversationArticleSelect;
