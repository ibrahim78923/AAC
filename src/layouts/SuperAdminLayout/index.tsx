import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
} from '@mui/material';

import Header from './Header';

import { isNullOrEmpty } from '@/utils';

import { getLowerRoutes, getRoutes } from './SuperAdminLayout.data';

import { SuperAdminLayoutI } from './SuperAdminLayout.type';

import { ArrowDownImage, ArrowUpImage, LogoImage } from '@/assets/images';

import { SuperAdminLayoutStyles } from './SuperAdminLayout.style';

import { v4 as uuidv4 } from 'uuid';

const drawerWidth = 220;
const role = 'SUPER_ADMIN';
const SuperAdminLayout = (props: SuperAdminLayoutI) => {
  const theme = useTheme();
  const { window, children } = props;
  const router = useRouter();

  const routes = getRoutes(role);
  const lowerRoutes = getLowerRoutes(role);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState<any>({});

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  const toggleDropDown = (linkKey: any) => {
    setIsDropDownOpen((prevState: any) => ({
      ...prevState,
      [linkKey]: !prevState[linkKey],
    }));
  };

  const drawer = (
    <>
      <Box sx={{ padding: '0px 0px 20px 10px' }}>
        <Image src={LogoImage} alt="logo" />
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
              routes.map((link) => (
                <div key={uuidv4()}>
                  {link.textNames ? (
                    <>
                      <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                        <Link
                          href={`${link.key}`}
                          style={{
                            width: '100%',
                            padding: '0px',
                          }}
                        >
                          <ListItemButton
                            sx={SuperAdminLayoutStyles.mainNavLink(
                              link,
                              router,
                              theme,
                            )}
                            onClick={() => toggleDropDown(link.key)}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <Image
                                src={link.icon}
                                alt="icons"
                                style={{
                                  opacity:
                                    router.pathname === link.key ||
                                    isDropDownOpen[link.key]
                                      ? '1'
                                      : '0.4',
                                }}
                              />
                            </ListItemIcon>

                            {link.label}

                            <Box sx={{ paddingLeft: '15px' }}>
                              <Image
                                src={
                                  isDropDownOpen[link.key]
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
                        in={isDropDownOpen[link.key]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {link.textNames.map((subItem: any) => (
                            <ListItem
                              key={subItem.key}
                              sx={{ padding: '2px 0px' }}
                            >
                              <ListItemButton
                                sx={SuperAdminLayoutStyles.collapseMenu(
                                  subItem,
                                  router,
                                  theme,
                                )}
                              >
                                <Link href={`${subItem.key}`}>
                                  {subItem.label}
                                </Link>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <Link key={link.key} href={`/${link.key}`}>
                      <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                        <ListItemButton
                          sx={SuperAdminLayoutStyles.mainNavLink(
                            link,
                            router,
                            theme,
                          )}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Image
                              src={link.icon}
                              alt={link.icon}
                              style={{
                                opacity: router.pathname.includes(`${link.key}`)
                                  ? '1'
                                  : '0.4',
                              }}
                            />
                          </ListItemIcon>
                          {link.label}
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  )}
                </div>
              ))}
          </List>
        </Box>

        <Box sx={{ paddingBottom: '20px' }}>
          <List>
            {!isNullOrEmpty(lowerRoutes) &&
              lowerRoutes.map((link) => (
                <div key={link.key}>
                  {link.textNames ? (
                    <>
                      <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                        <Link href={`${link.key}`} style={{ width: '100%' }}>
                          <ListItemButton
                            sx={SuperAdminLayoutStyles.mainNavLink(
                              link,
                              router,
                              theme,
                            )}
                            onClick={() => toggleDropDown(link.key)}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <Image
                                src={link.icon}
                                alt="icons"
                                style={{
                                  opacity:
                                    router.pathname === link.key ||
                                    isDropDownOpen[link.key]
                                      ? '1'
                                      : '0.4',
                                }}
                              />
                            </ListItemIcon>

                            {link.label}
                            <Box sx={{ paddingLeft: '20px' }}>
                              <Image
                                src={
                                  isDropDownOpen[link.key]
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
                        in={isDropDownOpen[link.key]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {link.textNames.map((subItem) => (
                            <ListItem
                              key={subItem.key}
                              sx={{ padding: '2px 0px' }}
                            >
                              <ListItemButton
                                sx={SuperAdminLayoutStyles.collapseMenu(
                                  subItem,
                                  router,
                                  theme,
                                )}
                              >
                                <Link href={`${subItem.key}`}>
                                  {subItem.label}
                                </Link>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <Link key={link.key} href={`/${link.key}`}>
                      <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                        <ListItemButton
                          sx={SuperAdminLayoutStyles.mainNavLink(
                            link,
                            router,
                            theme,
                          )}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Image
                              src={link.icon}
                              alt={link.icon}
                              style={{
                                opacity: router.pathname.includes(`${link.key}`)
                                  ? '1'
                                  : '0.4',
                              }}
                            />
                          </ListItemIcon>
                          {link.label}
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  )}
                </div>
              ))}
          </List>
        </Box>
      </Box>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={SuperAdminLayoutStyles.appToolbar(drawerWidth, theme)}>
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
          sx={SuperAdminLayoutStyles.mobileDrawer(drawerWidth)}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={SuperAdminLayoutStyles.mainDrawer(drawerWidth)}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={SuperAdminLayoutStyles.layoutBox(drawerWidth)}>
        <Toolbar />
        <Box sx={SuperAdminLayoutStyles.layoutInnerBox(theme)}>{children}</Box>
      </Box>
    </Box>
  );
};

export default SuperAdminLayout;
