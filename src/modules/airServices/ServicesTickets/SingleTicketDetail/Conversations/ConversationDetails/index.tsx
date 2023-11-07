import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { menuOptionsAddConversation } from '../Conversation.data';
import userConversation from '../userConversation';
import ConversationView from '../ConversationView';
import NoData from '@/components/NoData';
import { AddWhiteBgIcon } from '@/assets/icons';

export default function ConversationsDetails() {
  const {
    isConversation,
    open,
    handleClickButtonMenu,
    addConversation,
    handleCloseButtonMenu,
    setSelectedItem,
    renderSelectedComponent,
  } = userConversation();

  return (
    <Box marginTop={'20px'}>
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
              startIcon={<AddWhiteBgIcon />}
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
