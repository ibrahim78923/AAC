import AddIconWithBg from '@/assets/icons/shared/add-icon-with-bg-white';
import ConversationModel from '@/components/Model/CoversationModel';
// import NotFound from '@/components/NotFound';
import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
// import BarChart from '@/modules/BarChart/BarChart';
// import { useTheme } from '@emotion/react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const [isConversation, setIsConversation] = useState<boolean>(false);

  const [addCoversation, setAddCoversation] = useState<null | HTMLElement>(
    null,
  );
  const open = Boolean(addCoversation);
  const handleClickButtonMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAddCoversation(event.currentTarget);
  };
  const handleCloseButtonMenu = () => {
    setAddCoversation(null);
    // just for desgin will remove
    setIsConversation(!isConversation);
  };

  return (
    <Box sx={{ mt: '20px' }}>
      <ConversationModel />
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
              <MenuItem onClick={handleCloseButtonMenu}>Note</MenuItem>
              <MenuItem onClick={handleCloseButtonMenu}>Reply</MenuItem>
              <MenuItem onClick={handleCloseButtonMenu}>Forward</MenuItem>
              <MenuItem onClick={handleCloseButtonMenu}>Discuss</MenuItem>
            </Menu>
          </>
        )}
      </Box>
      {isConversation ? (
        <></>
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
                <MenuItem onClick={handleCloseButtonMenu}>Note</MenuItem>
                <MenuItem onClick={handleCloseButtonMenu}>Reply</MenuItem>
                <MenuItem onClick={handleCloseButtonMenu}>Forward</MenuItem>
                <MenuItem onClick={handleCloseButtonMenu}>Discuss</MenuItem>
              </Menu>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
Home.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
