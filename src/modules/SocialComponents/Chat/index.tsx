import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
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

import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setChatMessages,
  setChatMessagesLoading,
  setChatMetaInfo,
} from '@/redux/slices/chat/slice';
import { useGetChatUsersQuery, useGetUserChatsQuery } from '@/services/chat';
import { getSession, isNullOrEmpty } from '@/utils';
import { styles } from './Chat.style';
import { enqueueSnackbar } from 'notistack';
import { UserDefault } from '@/assets/images';
import { PAGINATION } from '@/config';

const Chat = () => {
  const dispatch: any = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const [loadingCreatingUser, setLoadingCreatingUser] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    isError,
  } = useGetUserChatsQuery({
    activeChatId: activeChatId,
    limit: chatMetaInfo?.limit,
    isGroup: chatMode === 'groupChat' ? true : false,
  });

  const { user }: { user: any } = getSession();
  const [currentPage, setCurrentPage] = useState(PAGINATION?.CURRENT_PAGE);
  const { data: chatsUsers, status: chatUsersStatus } = useGetChatUsersQuery({
    params: {
      organization: user?.organization?._id,
      page: currentPage,
      limit: PAGINATION?.PAGE_LIMIT,
      role: user?.role,
      search: searchTerm,
    },
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

  const transformedData = chatsUsers?.data?.users?.map((item: any) => ({
    id: item?._id,
    firstName: item?.firstName,
    lastName: item?.lastName,
    email: item?.email,
    src: UserDefault,
  }));

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handelNewUserChat = (item: any) => {
    setLoadingCreatingUser(true);
    socket.emit(
      'add-message',
      {
        receiverId: item?.id,
        content: '',
      },
      (response: any) => {
        if (response) {
          handleClose();
          setLoadingCreatingUser(false);
          enqueueSnackbar('New chat created', {
            variant: 'success',
          });
        }
      },
    );
  };

  const handelUserExists = () => {
    enqueueSnackbar('User already exists', {
      variant: 'info',
    });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3.5}>
          <Box sx={styles?.leftWrapper(theme)}>
            <Contacts handleManualRefetch={handleManualRefetch} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8.5}>
          <Box sx={styles?.rightWrapper}>
            {activeReceiverId ? (
              <ChatArea isError={isError} />
            ) : (
              <Box
                sx={{
                  background: theme?.palette?.common?.white,
                  width: '100%',
                  height: '85vh',
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
        <Box sx={{ width: '350px', m: 2 }}>
          <Typography
            variant="h5"
            color={theme?.palette?.grey[600]}
            sx={{ mb: 1 }}
          >
            New Chat
          </Typography>
          <Search
            label={'Search by name'}
            searchBy={searchTerm}
            setSearchBy={setSearchTerm}
            width="100%"
            size="small"
          />

          {loadingCreatingUser ? (
            <Box
              sx={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <CircularProgress size={20} /> Creating user
            </Box>
          ) : (
            <>
              <Box sx={styles?.usersBox}>
                {chatUsersStatus === 'pending' ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {!isNullOrEmpty(transformedData) ? (
                      transformedData?.map((item: any) => {
                        const isUserExists = chatContacts?.some(
                          (chat: any) =>
                            chat?.participants?.some(
                              (participant: any) =>
                                participant?._id === item?.id,
                            ),
                        );
                        return (
                          <>
                            {user?._id !== item?.id && (
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
                            )}
                          </>
                        );
                      })
                    ) : (
                      <>No Data Found</>
                    )}
                  </>
                )}
              </Box>
            </>
          )}

          {chatsUsers?.data?.meta?.pages > 1 && (
            <Pagination
              count={chatsUsers?.data?.meta?.pages}
              page={chatsUsers?.data?.meta?.page}
              siblingCount={0}
              onChange={handlePageChange}
            />
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default Chat;
