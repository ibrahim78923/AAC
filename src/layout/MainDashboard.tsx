import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

import {
  AppBar,
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  CssBaseline,
  useTheme,
  List,
  Collapse,
  Typography,
  Skeleton,
  Grid,
} from '@mui/material';

import Header from './Header';

import {
  setChangeChat,
  setChatContacts,
  setChatMessages,
  setIsNewMessages,
  setSocketConnection,
  setTypingUserData,
  setUpdateChatContactsActions,
} from '@/redux/slices/chat/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getActiveProductSession, getSession, isNullOrEmpty } from '@/utils';

import { getLowerRoutes, getRoutes, zeroPaddingRoutes } from './Layout.data';

import {
  ArrowDownImage,
  ArrowUpImage,
  LogoImage,
  LogoutImage,
} from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';
import useAuth from '@/hooks/useAuth';

import * as io from 'socket.io-client';
import { styles } from './Layout.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { enqueueSnackbar } from 'notistack';
import { CHAT_SOCKETS, ORG_ADMIN } from '@/routesConstants/paths';
import { AIR_CUSTOMER_PORTAL, PRODUCT_LABELS } from '@/constants';

const drawerWidth = 230;
const DashboardLayout = ({ children, window }: any) => {
  const theme = useTheme();
  const { authMeLoadingState } = useAuth();

  const router = useRouter();
  const currentPath = router.pathname;
  const pathSegments = currentPath.slice(1).split('/');

  const basePath = pathSegments[0];
  let productName = '';
  if (`/${basePath}` === AIR_CUSTOMER_PORTAL?.DASHBOARD) {
    productName = PRODUCT_LABELS?.CUSTOMER_PORTAL;
  } else if (`/${basePath}` === ORG_ADMIN?.DASHBOARD) {
    // Modification : manually push ORG_ADMIN.DASHBOARD
    productName = PRODUCT_LABELS?.ORG_ADMIN;
  } else {
    productName = getActiveProductSession()?.name;
  }

  const routes = getRoutes(productName);
  const lowerRoutes = getLowerRoutes(productName);
  const pathname = usePathname();

  const routerPathName = pathname?.split('/')[2] ?? pathname?.split('/')[1];

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState<any>({});

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleDropDown = (linkKey: any) => {
    setDropDownOpen((prevState: any) => ({
      [linkKey]: !prevState[linkKey],
    }));
  };

  const isZeroPaddingRoutes = zeroPaddingRoutes?.includes(router?.pathname);
  const { logout } = useAuth();

  const drawer = (
    <>
      {authMeLoadingState ? (
        <Box sx={{ width: '100%' }}>
          {[1, 2, 3, 4, 5, 6]?.map((index: any) => (
            <Skeleton
              variant="rectangular"
              key={index}
              width={190}
              height={40}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      ) : (
        <>
          <Box sx={{ padding: '0px 0px 20px 10px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Image src={LogoImage} alt="logo" />
              <Box>
                <Typography variant="h5">Air Applecart</Typography>
                <Typography
                  sx={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: theme?.palette?.primary?.main,
                    textTransform: 'uppercase',
                  }}
                >
                  {productName}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box>
              <List>
                {!isNullOrEmpty(routes) &&
                  routes?.map((link: any) => {
                    const pathNameKey =
                      link?.key?.split('/')[2] ?? link?.key?.split('/')[1];

                    return (
                      <div key={uuidv4()}>
                        {link?.textNames ? (
                          <>
                            <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                              <Link
                                href={`${link?.key}`}
                                style={{
                                  width: '100%',
                                  padding: '0px',
                                }}
                              >
                                <ListItemButton
                                  sx={styles?.mainNavLink(
                                    pathNameKey,
                                    routerPathName,
                                    theme,
                                  )}
                                  onClick={() => toggleDropDown(link?.key)}
                                >
                                  <ListItemIcon
                                    sx={{ minWidth: 20, marginRight: '10px' }}
                                  >
                                    <Image
                                      src={link?.icon}
                                      alt="icons"
                                      style={{
                                        opacity:
                                          routerPathName === pathNameKey
                                            ? '1'
                                            : '0.4',
                                      }}
                                    />
                                  </ListItemIcon>

                                  {link?.label}

                                  <Box sx={{ paddingLeft: '15px' }}>
                                    <Image
                                      src={
                                        routerPathName === pathNameKey
                                          ? ArrowUpImage
                                          : ArrowDownImage
                                      }
                                      alt="Avatar"
                                    />
                                  </Box>
                                </ListItemButton>
                              </Link>
                            </ListItem>
                            <Collapse
                              in={routerPathName === pathNameKey}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                {link?.textNames?.map((subItem: any) => (
                                  <Link href={`${subItem?.key}`} key={uuidv4()}>
                                    <PermissionsGuard
                                      permissions={link?.permissions}
                                    >
                                      <ListItem sx={{ padding: '0px' }}>
                                        <ListItemButton
                                          sx={styles?.collapseMenu(
                                            subItem,
                                            router,
                                            theme,
                                          )}
                                        >
                                          <Box
                                            sx={styles?.dropdownChildren(theme)}
                                          >
                                            {subItem?.label}
                                          </Box>
                                        </ListItemButton>
                                      </ListItem>
                                    </PermissionsGuard>
                                  </Link>
                                ))}
                              </List>
                            </Collapse>
                          </>
                        ) : (
                          <PermissionsGuard permissions={link?.permissions}>
                            <Link key={uuidv4()} href={`${link?.key}`}>
                              <ListItem
                                sx={{ padding: '6px 0px 6px 0px' }}
                                onClick={() => {
                                  setDropDownOpen({});
                                }}
                              >
                                <ListItemButton
                                  sx={styles?.mainNavLink(
                                    pathNameKey,
                                    routerPathName,
                                    theme,
                                  )}
                                >
                                  <ListItemIcon
                                    sx={{ minWidth: 20, marginRight: '10px' }}
                                  >
                                    <Image
                                      src={link?.icon}
                                      alt={link?.icon}
                                      style={{
                                        opacity:
                                          routerPathName === pathNameKey
                                            ? '1'
                                            : '0.4',
                                      }}
                                    />
                                  </ListItemIcon>
                                  {link?.label}
                                </ListItemButton>
                              </ListItem>
                            </Link>
                          </PermissionsGuard>
                        )}
                      </div>
                    );
                  })}
              </List>
            </Box>

            <Box sx={{ paddingBottom: '20px' }}>
              <List>
                {!isNullOrEmpty(lowerRoutes) &&
                  lowerRoutes?.map((link: any) => {
                    const lowerPathNameKey =
                      link?.key?.split('/')?.splice(2)[0] ??
                      link?.key?.split('/')?.splice(1)[0] ??
                      link?.key?.split('/')?.splice(0)[0];

                    return (
                      <div key={uuidv4()}>
                        {link?.textNames ? (
                          <>
                            <PermissionsGuard permissions={link?.permissions}>
                              <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                                <ListItemButton
                                  sx={styles?.LowerNavLink(
                                    lowerPathNameKey,
                                    routerPathName,
                                    dropDownOpen[link?.key],
                                    theme,
                                  )}
                                  onClick={() => toggleDropDown(link?.key)}
                                >
                                  <ListItemIcon sx={{ minWidth: 20 }}>
                                    <Image
                                      src={link?.icon}
                                      alt="icons"
                                      style={{
                                        opacity:
                                          routerPathName === lowerPathNameKey ||
                                          dropDownOpen[link?.key]
                                            ? '1'
                                            : '0.4',
                                      }}
                                    />
                                  </ListItemIcon>

                                  {link.label}
                                  <Box sx={{ paddingLeft: '20px' }}>
                                    <Image
                                      src={
                                        routerPathName === lowerPathNameKey ||
                                        dropDownOpen[link.key]
                                          ? ArrowUpImage
                                          : ArrowDownImage
                                      }
                                      alt="Avatar"
                                    />
                                  </Box>
                                </ListItemButton>
                              </ListItem>
                            </PermissionsGuard>
                            <Collapse
                              in={
                                dropDownOpen[link?.key] ||
                                routerPathName === lowerPathNameKey
                              }
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                {link?.textNames?.map((subItem: any) => (
                                  <Link href={`${subItem?.key}`} key={uuidv4()}>
                                    <PermissionsGuard
                                      permissions={link?.permissions}
                                    >
                                      <ListItem sx={{ padding: '0px' }}>
                                        <ListItemButton
                                          sx={styles?.collapseMenu(
                                            subItem,
                                            router,
                                            theme,
                                          )}
                                        >
                                          <Box
                                            sx={styles?.dropdownChildren(theme)}
                                          >
                                            {subItem?.label}
                                          </Box>
                                        </ListItemButton>
                                      </ListItem>
                                    </PermissionsGuard>
                                  </Link>
                                ))}
                              </List>
                            </Collapse>
                          </>
                        ) : (
                          <PermissionsGuard permissions={link?.permissions}>
                            <Link key={uuidv4()} href={`${link?.key}`}>
                              <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                                <ListItemButton
                                  sx={styles?.mainNavLink(link, router, theme)}
                                >
                                  <ListItemIcon sx={{ minWidth: 20 }}>
                                    <Image
                                      src={link?.icon}
                                      alt={link?.icon}
                                      style={{
                                        opacity: router?.pathname?.includes(
                                          `${link?.key}`,
                                        )
                                          ? '1'
                                          : '0.4',
                                      }}
                                    />
                                  </ListItemIcon>
                                  {link?.label}
                                </ListItemButton>
                              </ListItem>
                            </Link>
                          </PermissionsGuard>
                        )}

                        <ListItem
                          sx={{ padding: '6px 0px 6px 0px' }}
                          onClick={logout}
                        >
                          <ListItemButton
                            sx={styles?.mainNavLink(link, router, theme)}
                          >
                            <ListItemIcon
                              sx={{ minWidth: 20, marginRight: '10px' }}
                            >
                              <Image
                                src={LogoutImage}
                                alt={'LogoutImage'}
                                style={{
                                  opacity: '0.4',
                                }}
                              />
                            </ListItemIcon>
                            <Typography fontWeight={500} fontSize={14}>
                              {' '}
                              Logout
                            </Typography>
                          </ListItemButton>
                        </ListItem>
                      </div>
                    );
                  })}
                {isNullOrEmpty(lowerRoutes) && (
                  <ListItem
                    sx={{ padding: '6px 0px 6px 0px' }}
                    onClick={logout}
                  >
                    <ListItemButton
                      sx={styles?.mainNavLink('link', router, theme)}
                    >
                      <ListItemIcon sx={{ minWidth: 20, marginRight: '10px' }}>
                        <Image
                          src={LogoutImage}
                          alt={'LogoutImage'}
                          style={{
                            opacity: '0.4',
                          }}
                        />
                      </ListItemIcon>
                      <Typography fontWeight={500} fontSize={14}>
                        {' '}
                        Logout
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Box>
          </Box>
        </>
      )}
    </>
  );

  const container =
    window !== undefined ? () => window()?.document?.body : undefined;

  const dispatch = useAppDispatch();

  const {
    accessToken,
  }: { accessToken: string; refreshToken: string; user: any } = getSession();

  const activeChatId = useAppSelector((state) => state?.chat?.activeChatId);
  const chatContacts = useAppSelector((state) => state?.chat?.chatContacts);

  const [socket, setSocket] = useState<any>();
  useEffect(() => {
    try {
      if (!socket) {
        const res: any = io.connect(`${process?.env?.NEXT_PUBLIC_BASE_URL}`, {
          auth: (cb) => {
            cb({
              accessToken: accessToken,
            });
          },
          extraHeaders: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        });

        setSocket(res);
        dispatch(setSocketConnection({ isConnected: true, socket: res }));
      }
    } catch (err: any) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
    }

    const pingInterval = setInterval(() => {
      socket.emit(CHAT_SOCKETS?.PING);
    }, 5000);

    return () => {
      if (socket) {
        socket.disconnect();
      }
      clearInterval(pingInterval);
    };
  }, [socket]);

  if (socket) {
    socket.on(CHAT_SOCKETS?.ON_STATUS_CHANGE, () => {});

    socket.on(CHAT_SOCKETS?.ON_GROUP_CREATE, (payload: any) => {
      dispatch(setChatContacts(payload));
    });
    socket.on(CHAT_SOCKETS?.ADD_MESSAGE, () => {});

    socket.on(CHAT_SOCKETS?.ON_NEW_CHAT, (payload: any) => {
      dispatch(setChatContacts(payload));
    });
    socket.on(CHAT_SOCKETS?.SOCKET_ERROR_OCCURED, () => {});
    socket.on(CHAT_SOCKETS?.UPDATE_MESSAGE, () => {});
    socket.on('on-message-update', (payload: any) => {
      dispatch(setChatMessages(payload?.data));
    });
  }

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const currentUserId = user?._id;

  useEffect(() => {
    const handleOnMessageReceived = (payload: any) => {
      if (payload?.data) {
        const updatedChatContacts = chatContacts?.map((chat: any) => {
          const filteredParticipants = chat?.participants?.filter(
            (participant: any) => participant?._id !== currentUserId,
          );
          if (chat?._id === payload?.data?.chatId) {
            return {
              ...chat,
              content: payload?.data?.content,
              ...(filteredParticipants[0]?._id === chat?.ownerId &&
                activeChatId !== chat?._id && {
                  unReadMessagesCount: chat?.unReadMessagesCount + 1,
                }),
              ...(filteredParticipants[0]?._id === chat?.ownerId &&
                activeChatId !== chat?._id && { unread: true }),
            };
          }
          return chat;
        });

        dispatch(setUpdateChatContactsActions(updatedChatContacts));
      }

      if (activeChatId === payload?.data?.chatId) {
        if (payload?.data) {
          dispatch(setChatMessages(payload?.data));
          dispatch(setChangeChat(payload?.data));
          dispatch(setIsNewMessages(false));
        }
      }
    };

    const handleOnGrpMessageReceived = (payload: any) => {
      if (payload) {
        const updatedChatContacts = chatContacts?.map((chat: any) => {
          const filteredParticipants = chat?.participants?.filter(
            (participant: any) => participant?._id === currentUserId,
          );
          if (chat?._id === payload?.chatId) {
            return {
              ...chat,
              content: payload?.content,

              ...(filteredParticipants[0]?._id !== payload?.ownerId &&
                activeChatId !== payload?.groupDetail?._id && {
                  unReadMessagesCount: chat?.unReadMessagesCount + 1,
                }),
              ...(filteredParticipants[0]?._id !== payload?.ownerId &&
                activeChatId !== payload?.groupDetail?._id && { unread: true }),
            };
          }
          return chat;
        });

        dispatch(setUpdateChatContactsActions(updatedChatContacts));
      }

      if (activeChatId === payload?.chatId) {
        if (payload) {
          dispatch(setChatMessages(payload));
          dispatch(setChangeChat(payload));
          dispatch(setIsNewMessages(false));
        }
      }
    };

    const handleTypingStart = (payload: any) => {
      if (
        activeChatId === payload?.chatId ||
        activeChatId === payload?.groupId
      ) {
        dispatch(
          setTypingUserData({
            userName: payload?.typingUserName,
          }),
        );
      }
    };

    const handleTypingStop = () => {
      dispatch(setTypingUserData({}));
    };

    if (socket) {
      socket.on(CHAT_SOCKETS?.ON_MESSAGE_RECEIVED, handleOnMessageReceived);
      socket.on(
        CHAT_SOCKETS?.ON_GRP_MESSAGE_RECEIVED,
        handleOnGrpMessageReceived,
      );
      socket.on(CHAT_SOCKETS?.ON_TYPING_START, handleTypingStart);
      socket.on(CHAT_SOCKETS?.ON_TYPING_STOP, handleTypingStop);
    }
    return () => {
      if (socket) {
        socket.off(CHAT_SOCKETS?.ON_MESSAGE_RECEIVED, handleOnMessageReceived);
        socket.off(
          CHAT_SOCKETS?.ON_GRP_MESSAGE_RECEIVED,
          handleOnGrpMessageReceived,
        );
        socket.off(CHAT_SOCKETS?.ON_TYPING_START, handleTypingStart);
        socket.off(CHAT_SOCKETS?.ON_TYPING_STOP, handleTypingStop);
      }
    };
  }, [activeChatId, chatContacts, dispatch, socket]);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={styles?.appToolbar(drawerWidth, theme)}>
        <Header handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={isMobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={styles?.mobileDrawer(drawerWidth)}
        >
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={styles?.mainDrawer(drawerWidth)} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={styles?.layoutBox(drawerWidth)}>
        <Toolbar />

        <Box sx={styles?.layoutInnerBox(theme, isZeroPaddingRoutes)}>
          {authMeLoadingState ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <Skeleton
                    variant="rectangular"
                    height={300}
                    animation="wave"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Skeleton
                    variant="rectangular"
                    height={300}
                    animation="wave"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Skeleton
                    variant="rectangular"
                    height={300}
                    animation="wave"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Skeleton
                    variant="rectangular"
                    height={300}
                    animation="wave"
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            children
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
