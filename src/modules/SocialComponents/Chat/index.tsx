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
  setActiveChat,
  setActiveChatId,
  setActiveConversation,
  setActiveParticipant,
  setActiveReceiverId,
  setChatContacts,
  setChatMessages,
  setChatMessagesLoading,
  setChatMetaInfo,
  setChatModes,
  setNewOrFetchedChatMessages,
} from '@/redux/slices/chat/slice';
import {
  useGetChatUsersByCompanyQuery,
  useGetUserChatsQuery,
} from '@/services/chat';
import { getSession, isNullOrEmpty } from '@/utils';
import { styles } from './Chat.style';
import { enqueueSnackbar } from 'notistack';
import { UserDefault } from '@/assets/images';
import { IMG_URL, PAGINATION } from '@/config';
import { API_STATUS, CHAT_TYPES } from '@/constants';

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
  const activeChat = useAppSelector((state) => state?.chat?.activeChat);
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
  } = useGetUserChatsQuery(
    {
      activeChatId: activeChatId,
      limit: chatMetaInfo?.limit,
      page: chatMetaInfo?.page,
      isGroup: chatMode === CHAT_TYPES?.GROUP_CHAT ? true : false,
      messageDeletionTimestamp: activeChat?.messageDeletionTimestamp,
    },
    { skip: activeChatId ? false : true, refetchOnMountOrArgChange: true },
  );

  const { user }: { user: any } = getSession();
  const [currentPage, setCurrentPage] = useState(PAGINATION?.CURRENT_PAGE);
  const { data: chatsUsersData, status: chatUsersStatus } =
    useGetChatUsersByCompanyQuery({
      params: {
        page: currentPage,
        limit: PAGINATION?.PAGE_LIMIT,
        ...(searchTerm?.length > 0 && { search: searchTerm }),
      },
    });
  const handleManualRefetch = () => {
    if (activeChatId) {
      dispatch(setChatMessages([]));
      refetch();
    }
  };
  useEffect(() => {
    if (chatsData?.data?.meta?.page === 1) {
      dispatch(setChatMetaInfo(chatsData?.data?.meta));
    }
  }, [chatsData]);

  const [getReqRenderTrack, setGetReqRenderTrack] = useState(0);

  useEffect(() => {
    if (status === API_STATUS?.FULFILLED) {
      setGetReqRenderTrack(getReqRenderTrack + 1);
    }
  }, [activeChatId, status]);

  useEffect(() => {
    if (chatsData?.data?.messages?.length > 0) {
      dispatch(
        setNewOrFetchedChatMessages(
          chatsData?.data?.messages?.map((item: any) => item),
        ),
      );
    }
  }, [chatsData?.data?.messages, getReqRenderTrack]);

  useEffect(() => {
    if (status === API_STATUS?.PENDING) {
      dispatch(setChatMessagesLoading(true));
    } else {
      dispatch(setChatMessagesLoading(false));
    }
  }, [status]);

  const transformedData = chatsUsersData?.data?.usercompanyaccounts?.map(
    (item: any) => ({
      id: item?._id,
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      src: item?.avatar?.url ? `${IMG_URL}${item?.avatar?.url}` : UserDefault,
      // src: UserDefault,
    }),
  );
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
          setSearchTerm('');
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

  useEffect(() => {
    return () => {
      dispatch(setChatModes({ chatModeState: CHAT_TYPES?.PERSONAL_CHAT }));
      dispatch(setActiveChat({}));
      dispatch(setActiveReceiverId(''));
      dispatch(setActiveConversation({}));
      dispatch(setChatMessages([]));
      dispatch(setChatContacts([]));
      dispatch(setActiveChatId(''));
      dispatch(setActiveParticipant({}));
      dispatch(setNewOrFetchedChatMessages([]));
    };
  }, []);

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
              <CircularProgress size={20} />
            </Box>
          ) : (
            <>
              <Box sx={styles?.usersBox}>
                {chatUsersStatus === API_STATUS?.PENDING ? (
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
                                  style={{ borderRadius: '50%' }}
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

          {chatsUsersData?.data?.meta?.pages > 1 && (
            <Pagination
              count={chatsUsersData?.data?.meta?.pages}
              page={chatsUsersData?.data?.meta?.page}
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
