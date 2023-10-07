import AddIconWithBg from '@/assets/icons/shared/add-icon-with-bg-white';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { menuOptionsAddconversation } from './Conversation.data';
import { v4 as uuidv4 } from 'uuid';
import userCoversation from './userCoversation';
import ConversationModelSub from './Model';
import ViewConversation from './View';

export default function Conversation() {
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
  return (
    <Box sx={{ mt: '20px' }}>
      <ConversationModelSub
        selectedItem={selectedItem}
        show={show}
        setShow={setShow}
        addCoversationModel={addCoversationModel}
        onSubmit={onSubmit}
      />
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Conversation</Typography>
        {isConversation && (
          <>
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
              Add Conversation
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
              {menuOptionsAddconversation.map((item: any) => (
                <MenuItem
                  onClick={(e) => {
                    handleCloseButtonMenu(e);
                    setSelectedItem(item.value);
                  }}
                  key={uuidv4()}
                  value={item.value}
                >
                  {item.label}
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
                There are no conversation available{' '}
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
                {' '}
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
                {menuOptionsAddconversation.map((item: any) => (
                  <MenuItem
                    onClick={(e) => {
                      handleCloseButtonMenu(e);
                      setSelectedItem(item.value);
                    }}
                    key={uuidv4()}
                    value={item.value}
                  >
                    {item.label}
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
