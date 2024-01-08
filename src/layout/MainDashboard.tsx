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
} from '@mui/material';

import Header from './Header';

import {
  setChangeChat,
  setChatMessages,
  setSocketConnection,
  setTypingUserData,
} from '@/redux/slices/chat/slice';
import { useAppDispatch } from '@/redux/store';
import { getSession, isNullOrEmpty } from '@/utils';

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

const drawerWidth = 230;

// const array = [
//   {
//     email: 'mubashir.yusuf@ceative.co.uk',
//     role: 'SUPER_ADMIN',
//   },
//   {
//     email: 'azeem.aslam@ceative.co.uk',
//     role: 'AIR_SALES',
//   },
//   {
//     email: 'airmarketerapplecart@yopmail.com',
//     role: 'AIR_MARKETER',
//   },
//   {
//     email: 'orgadminairapplecard@yopmail.com',
//     role: 'ORG_ADMIN',
//   },
//   {
//     email: 'wan@yopmail.com',
//     role: 'AIR_SERVICES',
//   },
//   {
//     email: 'operations@example.com',
//     role: 'AIR_OPERATIONS',
//   },
//   {
//     email: 'loyalty@example.com',
//     role: 'LOYALTY_PROGRAM',
//   },
//   {
//     email: 'customer@example.com',
//     role: 'CUSTOMER_PORTAL',
//   },
// ];

const DashboardLayout = ({ children, window }: any) => {
  const theme = useTheme();

  const { product }: any = useAuth();

  const router = useRouter();

  const findEmailRole = product?.name ?? 'Super Admin';

  const routes = getRoutes(findEmailRole);

  const lowerRoutes = getLowerRoutes(findEmailRole);
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

  const isZeroPaddingRoutes = zeroPaddingRoutes?.includes(pathname);
  const { logout } = useAuth();

  const drawer = (
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
              {findEmailRole}
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
                        <PermissionsGuard
                          sidebar="ItemPermission"
                          permissions={link?.permissions}
                        >
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

                                {link.label}

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
                        </PermissionsGuard>
                        <Collapse
                          in={routerPathName === pathNameKey}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {link?.textNames?.map((subItem: any) => (
                              <Link href={`${subItem?.key}`} key={uuidv4()}>
                                <PermissionsGuard
                                  sidebar="ItemPermission"
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
                                      <Box sx={styles?.dropdownChildren(theme)}>
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
                      <PermissionsGuard
                        sidebar="ItemPermission"
                        permissions={link?.permissions}
                      >
                        <Link key={uuidv4()} href={`${link?.key}`}>
                          <ListItem
                            sx={{ padding: '6px 0px 6px 0px' }}
                            onClick={() => setDropDownOpen({})}
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
                        <PermissionsGuard
                          sidebar="ItemPermission"
                          permissions={link?.permissions}
                        >
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
                                  sidebar="ItemPermission"
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
                                      <Box sx={styles?.dropdownChildren(theme)}>
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
                      <PermissionsGuard
                        sidebar="ItemPermission"
                        permissions={link?.permissions}
                      >
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
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <Image
                            src={LogoutImage}
                            alt={'LogoutImage'}
                            style={{
                              opacity: '0.4',
                            }}
                          />
                        </ListItemIcon>
                        Logout
                      </ListItemButton>
                    </ListItem>
                  </div>
                );
              })}
          </List>
        </Box>
      </Box>
    </>
  );

  const container =
    window !== undefined ? () => window()?.document?.body : undefined;

  const dispatch = useAppDispatch();

  const {
    accessToken,
  }: { accessToken: string; refreshToken: string; user: any } = getSession();

  const [socket, setSocket] = useState<any>();
  useEffect(() => {
    if (!socket) {
      const res: any = io.connect(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
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
  }, []);

  if (socket) {
    socket.on('on-status-change', () => {});
    socket.on('add-message', () => {});
    socket.on('on-new-chat', () => {});
    socket.on('on-message-received', (payload: any) => {
      if (payload?.data) {
        dispatch(setChatMessages(payload?.data));
        dispatch(setChangeChat(payload?.data));
      }
    });
    socket.on('update-message', () => {});

    socket.on('on-message-update', (payload: any) => {
      dispatch(setChatMessages(payload?.data));
    });

    socket.on('on-typing-start', (payload: any) => {
      dispatch(
        setTypingUserData({
          userName: payload?.typingUserName,
        }),
      );
    });
    socket.on('on-typing-stop', () => {
      dispatch(setTypingUserData({}));
    });
  }

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
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
