import AddIconWithBg from '@/assets/icons/shared/add-icon-with-bg-white';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { menuOptionsAddconversation } from './Conversation.data';
import { v4 as uuidv4 } from 'uuid';
import userCoversation from './userCoversation';
import ViewConversation from './ConversationView';
import ConversationNote from './ConversationNote';
import ConversationReply from './ConversationReply';
import ConversationForward from './ConversationForward';
import ConversationDiscuss from './ConversationDiscuss';

export default function Conversations() {
  const {
    isConversation,
    open,
    show,
    setShow,
    handleClickButtonMenu,
    addCoversation,
    handleCloseButtonMenu,
    setSelectedItem,
    addCoversationModel,
    selectedItem,
    onSubmit,
  } = userCoversation();

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case 'Note':
        return (
          <ConversationNote
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addCoversationModel={addCoversationModel}
            onSubmit={onSubmit}
          />
        );
      case 'Reply':
        return (
          <ConversationReply
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addCoversationModel={addCoversationModel}
            onSubmit={onSubmit}
          />
        );
      case 'Forward':
        return (
          <ConversationForward
            selectedItem={selectedItem}
            show={show}
            setShow={setShow}
            addCoversationModel={addCoversationModel}
            onSubmit={onSubmit}
          />
        );
      case 'Discuss':
        return <ConversationDiscuss />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: '20px' }}>
      {renderSelectedComponent()}
      <Box
        sx={{
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Conversation</Typography>
        {isConversation && (
          <>
            <Box
              display={'flex'}
              marginTop={'190px'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography>There are no conversations available</Typography>
              <br />
              <Button
                variant="contained"
                startIcon={<AddIconWithBg />}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickButtonMenu}
              >
                {' '}
                Add
              </Button>
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={addCoversation}
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
              {menuOptionsAddconversation?.map((item: any) => (
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
          </>
        )}
      </Box>

      {isConversation ? (
        <ViewConversation />
      ) : (
        <>
          <Box
            sx={{
              mt: '300px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography fontSize={'13px'} mb={'10px'}>
                There are no conversations available{' '}
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIconWithBg />}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickButtonMenu}
              >
                Add
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={addCoversation}
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
                {menuOptionsAddconversation.map((item) => (
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
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
