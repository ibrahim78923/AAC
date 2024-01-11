import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Grid,
  Popover,
  Typography,
  useTheme,
} from '@mui/material';

import Contacts from './Contacts';
import ChatArea from './ChatArea';

import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import { options } from '@/mock/modules/SocialComponents/Chat';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setChatMessages,
  setChatMessagesLoading,
  setChatMetaInfo,
} from '@/redux/slices/chat/slice';
import { useGetUserChatsQuery } from '@/services/chat';
import { isNullOrEmpty } from '@/utils';
import { styles } from './Chat.style';

const Chat = () => {
  const dispatch: any = useAppDispatch();

  const theme = useTheme();
  const socket = useAppSelector((state) => state?.chat?.socket);

  const activeChatId = useAppSelector((state) => state?.chat?.activeChatId);
  const chatContacts = useAppSelector((state) => state?.chat?.chatContacts);
  const chatModeState = useAppSelector(
    (state: any) => state?.chat?.chatModeState?.chatModeState,
  );
  const chatMetaInfo = useAppSelector((state) => state?.chat?.chatMetaInfo);

  const activeReceiverId = useAppSelector(
    (state) => state?.chat?.activeReceiverId,
  );
  const chatMode = useAppSelector(
    (state) => state?.chat?.chatModeState?.chatModeState,
  );

  const {
    data: chatsData,
    refetch,
    status,
  } = useGetUserChatsQuery({
    activeChatId: activeChatId,
    limit: chatMetaInfo?.limit,
    isGroup: chatMode === 'groupChat' ? true : false,
  });

  const handleManualRefetch = () => {
    refetch();
  };

  useEffect(() => {
    dispatch(setChatMetaInfo(chatsData?.data?.meta));
  }, [chatsData]);

  useEffect(() => {
    if (chatsData?.data?.messages?.length > 0) {
      dispatch(
        setChatMessages(chatsData?.data?.messages?.map((item: any) => item)),
      );
    }
  }, [chatsData]);

  useEffect(() => {
    if (status === 'pending') {
      dispatch(setChatMessagesLoading(true));
    } else {
      dispatch(setChatMessagesLoading(false));
    }
  }, [status]);

  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handelNewUserChat = (item: any) => {
    socket.emit(
      'add-message',
      {
        receiverId: item?.id,
        content: '',
      },
      () => {},
    );
  };

  const handelUserExists = () => {};

  return (
    <Box sx={{ position: 'relative' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3.5}>
          <Box sx={styles?.leftWrapper}>
            <Contacts handleManualRefetch={handleManualRefetch} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8.5}>
          <Box sx={styles?.rightWrapper}>
            {activeReceiverId ? (
              <ChatArea />
            ) : (
              <Box
                sx={{
                  background: theme?.palette?.common?.white,
                  width: '100%',
                  height: '80vh',
                  p: 2,
                  borderRadius: '20px',
                }}
              >
                Select Contacts..
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {chatModeState === 'groupChat' ? null : (
        <Button
          style={{
            position: 'absolute',
            right: '-10px',
            bottom: '-18px',
            cursor: 'grab',
            padding: '0px',
            width: 'fit-content',
            minWidth: 'fit-content',
            height: 'fit-content',
            borderRadius: '50%',
          }}
          aria-describedby={id}
          onClick={handleClick}
        >
          <PlusIcon width={55} color={theme?.palette?.primary?.main} />
        </Button>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: '300px', m: 2 }}>
          <Typography
            variant="h5"
            color={theme?.palette?.grey[600]}
            sx={{ mb: 1 }}
          >
            New Chat
          </Typography>
          <Search
            searchBy={searchTerm}
            setSearchBy={setSearchTerm}
            label="Search By Name"
            fullWidth
            size="small"
            sx={{ marginBottom: '15px' }}
          />
          <Box sx={styles?.usersBox}>
            {!isNullOrEmpty(options) &&
              options?.map((item: any) => {
                const isUserExists = chatContacts?.some(
                  (chat: any) =>
                    chat?.participants?.some(
                      (participant: any) => participant?._id === item?.id,
                    ),
                );
                return (
                  <Button
                    key={uuidv4()}
                    sx={styles?.userCard}
                    onClick={() =>
                      isUserExists
                        ? handelUserExists()
                        : handelNewUserChat(item)
                    }
                  >
                    <Image
                      width={30}
                      height={30}
                      src={item?.src}
                      alt={item?.name}
                    />
                    <Typography
                      variant="body2"
                      color={theme?.palette?.grey[600]}
                    >
                      {item?.firstName}&nbsp;{item?.lastName}
                    </Typography>
                  </Button>
                );
              })}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Chat;
