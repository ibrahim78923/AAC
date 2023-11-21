// ConversationsDetails.tsx
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { menuOptionsAddConversation } from '../Conversation.data';
import ConversationView from '../ConversationView';
import NoData from '@/components/NoData';
import { AddWhiteBgIcon } from '@/assets/icons';
import { NoAssociationFoundImage } from '@/assets/images';
import { UseConversation } from '../useConversation';

const ConversationsDetails = () => {
  const {
    isConversation,
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
        <Button
          variant="contained"
          startIcon={<AddWhiteBgIcon />}
          id="conversation-button"
          aria-controls={open ? 'conversation-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickButtonMenu}
          sx={{ marginLeft: 'auto' }}
        >
          {' '}
          Add Conversation
        </Button>
        <Box />
        {isConversation && (
          <Menu
            id="conversation-menu"
            anchorEl={addConversation}
            open={open}
            onClose={handleCloseButtonMenu}
            sx={{
              '& .MuiList-root': {
                width: 280,
              },
            }}
            MenuListProps={{
              'aria-labelledby': 'conversation-button',
            }}
          >
            {menuOptionsAddConversation?.map((item: any) => (
              <MenuItem
                onClick={(e) => {
                  handleCloseButtonMenu(e);
                  setSelectedItem(item?.value);
                }}
                key={uuidv4()}
                value={item?.value}
              >
                {item?.label}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Box>
      {isConversation ? (
        <ConversationView selectedValues={selectedValues} />
      ) : (
        <NoData
          message="There are no Conversation"
          image={NoAssociationFoundImage}
        >
          <Button
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            id="conversation-button"
            aria-controls={open ? 'conversation-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickButtonMenu}
          >
            Add Conversation
          </Button>
        </NoData>
      )}
    </Box>
  );
};

export default ConversationsDetails;
