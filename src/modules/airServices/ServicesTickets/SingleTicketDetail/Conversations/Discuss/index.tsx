import { LogoImage } from '@/assets/images';
import { Box, Drawer, Typography } from '@mui/material';
import { MessageBox } from './MessageBox';
import { ChatEditor } from './ChatEditor';
import { useState } from 'react';
import { DeleteMessage } from './DeleteMessage';
import { Close } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airServices/ticket-conversation/slice';
import { StaticAvatar } from '@/components/Avatars/StaticAvatar';

export const Discuss = () => {
  const [selectedMessage, setSelectedMessage] = useState<any>({});
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTicketConversation?.isPortalOpen,
  );

  return (
    <>
      <Drawer
        anchor="right"
        open={isPortalOpen?.isOpen}
        onClose={() => {
          dispatch(setIsPortalClose());
          setSelectedMessage?.({});
        }}
        sx={{
          '.MuiModal-backdrop': {
            backgroundColor: 'unset !important',
            background: 'unset !important',
          },
          '.MuiDrawer-paper': {
            height: '60vh',
            minHeight: '60vh',
            bottom: '0 !important',
            width: { sm: '350px', xs: '100vw' },
            top: 'unset',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: `1rem !important`,
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            flex: '0 0 auto',
            borderTopLeftRadius: 1,
          }}
          p={1}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={1}
            justifyContent={'space-between'}
          >
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <StaticAvatar
                avatarSrc={LogoImage?.src}
                avatarSize={{
                  width: 30,
                  height: 30,
                }}
              />
              <Typography
                variant="body1"
                color="slateBlue.main"
                fontWeight={'600'}
              >
                Air Apple Cart
              </Typography>
              <Typography
                variant="body3"
                fontWeight={'600'}
                color="slateBlue.main"
              >
                Discuss
              </Typography>
            </Box>
            <Close
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setIsPortalClose());
                setSelectedMessage?.({});
              }}
            />
          </Box>
        </Box>
        <Box flexGrow={1} overflow={'auto'} p={1.5}>
          <MessageBox
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
          />
        </Box>
        <Box
          sx={{ flex: '0 0 auto' }}
          pt={1}
          bgcolor="common.white"
          boxShadow={4}
        >
          <ChatEditor
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
          />
        </Box>
      </Drawer>
      {selectedMessage?.isDelete && (
        <DeleteMessage
          selectedMessage={selectedMessage}
          setSelectedMessage={setSelectedMessage}
        />
      )}
    </>
  );
};
