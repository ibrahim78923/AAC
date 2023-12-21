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
import { GroupAvatarImage, UserAvatarImage } from '@/assets/images';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setChatContacts, setChatMessages } from '@/redux/slices/chat/slice';
import { useGetUserChatsQuery } from '@/services/chat';
import { getSession, isNullOrEmpty } from '@/utils';
import { styles } from './Chat.style';

const Chat = () => {
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const socket = useAppSelector((state) => state?.chat?.socket);

  const activeChatId = useAppSelector((state) => state?.chat?.activeChatId);
  const chatContacts = useAppSelector((state) => state?.chat?.chatContacts);
  const activeReceiverId = useAppSelector(
    (state) => state?.chat?.activeReceiverId,
  );

  const { data: chatsData, refetch } = useGetUserChatsQuery({
    activeChatId: activeChatId,
  });

  const handleManualRefetch = () => {
    refetch();
  };

  useEffect(() => {
    if (chatsData?.data?.messages?.length > 0) {
      dispatch(
        setChatMessages(chatsData?.data?.messages?.map((item: any) => item)),
      );
    }
  }, [chatsData]);

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

  const options = [
    {
      id: '655dcbb8425d2c04a46a3830',
      firstName: 'waqas',
      lastName: 'khan',
      email: 'testWAQASKhan@example.com',
      src: UserAvatarImage,
    },
    {
      id: '655dcda7425d2c04a46a3836',
      firstName: 'zahir',
      lastName: 'khan',
      email: 'testZahirKhan@example.com',
      src: GroupAvatarImage,
    },
    {
      id: '655dcdc8425d2c04a46a3838',
      firstName: 'ahsan',
      lastName: 'khan',
      email: 'testAhsanKhan@example.com',
      src: UserAvatarImage,
    },
    {
      id: '655dcde8425d2c04a46a383a',
      firstName: 'nabeel',
      lastName: 'khan',
      email: 'testNableeKhan@example.com',
      src: UserAvatarImage,
    },
    {
      id: '655dcdfd425d2c04a46a383c',
      firstName: 'waseem',
      lastName: 'khan',
      email: 'testWaseemKhan@example.com',
      src: UserAvatarImage,
    },
  ];

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const handelNewUserChat = (item: any) => {
    socket.emit(
      'add-message',
      {
        receiverId: item?.id,
        content: '',
      },
      (response: any) => {
        if (response?.data?.chatId) {
          dispatch(
            setChatContacts({
              _id: response?.data?.chatId,
              ownerId: user?._id, // Current user id
              participants: [
                {
                  _id: user?._id,
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                },
                {
                  _id: item.id,
                  firstName: item.firstName,
                  lastName: item.lastName,
                },
              ],
            }),
          );
        }
      },
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
                  background: '#fff',
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
        <PlusIcon width={55} color={'#38CAB5'} />
      </Button>
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
