import AddIconWithBg from '@/assets/icons/shared/add-icon-with-bg-white';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ConversationNote from '../ConversationNote';
import ConversationReply from '../ConversationReply';
import ConversationForward from '../ConversationForward';
import ConversationDiscuss from '../ConversationDiscuss';
import { menuOptionsAddConversation } from '../Conversation.data';
import userConversation from '../userConversation';
import ConversationView from '../ConversationView';
import NoData from '@/components/NoData';

export default function ConversationsDetails() {
  const {
    isConversation,
    open,
    show,
    setShow,
    handleClickButtonMenu,
    addConversation,
    handleCloseButtonMenu,
    setSelectedItem,
    addConversationModal,
    selectedItem,
    onSubmit,
  } = userConversation();

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case 'Note':
        return (
          <ConversationNote
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addConversationModal={addConversationModal}
            onSubmit={onSubmit}
          />
        );
      case 'Reply':
        return (
          <ConversationReply
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addConversationModel={addConversationModal}
            onSubmit={onSubmit}
          />
        );
      case 'Forward':
        return (
          <ConversationForward
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addConversationModel={addConversationModal}
            onSubmit={onSubmit}
          />
        );
      case 'Discuss':
        return (
          <ConversationDiscuss
            resetSelectedItem={() => setSelectedItem(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: '20px' }}>
      {renderSelectedComponent()}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Conversation</Typography>
        <Button
          variant="contained"
          startIcon={<AddIconWithBg />}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
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
            id="basic-menu"
            anchorEl={addConversation}
            open={open}
            onClose={handleCloseButtonMenu}
            sx={{
              '& .MuiList-root': {
                width: '280px',
              },
            }}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
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
        <ConversationView />
      ) : (
        <>
          <NoData message="There are no Asset Associations">
            <Button
              variant="contained"
              startIcon={<AddIconWithBg />}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickButtonMenu}
            >
              Add Conversation
            </Button>
          </NoData>
        </>
      )}
    </Box>
  );
}
