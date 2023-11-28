import React from 'react';
import { Box, Typography } from '@mui/material';
import ConversationView from '../ConversationView';
import { UseConversation } from '../useConversation';
import { menuOptionsAddConversation } from '../Conversation.data';
import ConversationMenu from '../ConversationMenu';

const ConversationsDetails = () => {
  const {
    open,
    handleClickButtonMenu,
    addConversation,
    handleCloseButtonMenu,
    setSelectedItem,
    renderSelectedComponent,
    selectedValues,
  } = UseConversation();

  return (
    <Box marginTop={'1.25rem'}>
      {renderSelectedComponent()}
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="h4">Conversation</Typography>
        {Object?.entries(selectedValues)?.length > 0 && (
          <ConversationMenu
            open={open}
            handleClickButtonMenu={handleClickButtonMenu}
            addConversation={addConversation}
            handleCloseButtonMenu={handleCloseButtonMenu}
            setSelectedItem={setSelectedItem}
            menuOptionsAddConversation={menuOptionsAddConversation}
          />
        )}
      </Box>
      <ConversationView
        selectedValues={selectedValues}
        open={open}
        handleClickButtonMenu={handleClickButtonMenu}
        addConversation={addConversation}
        handleCloseButtonMenu={handleCloseButtonMenu}
        setSelectedItem={setSelectedItem}
      />
    </Box>
  );
};

export default ConversationsDetails;
