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
  Typography,
} from '@mui/material';

import Header from './Header';

import { isNullOrEmpty } from '@/utils';

import { LayoutI } from './Layout.interface';

import { getLowerRoutes, getRoutes } from './Layout.data';

import { ArrowDownImage, ArrowUpImage, LogoImage } from '@/assets/images';

import { styles } from './Layout.style';

import { v4 as uuidv4 } from 'uuid';

const drawerWidth = 220;
const role = 'SUPER_ADMIN';

const Layout = (props: LayoutI) => {
  const theme = useTheme();
  const { window, children } = props;
  const router = useRouter();

  const routes = getRoutes(role);
  const lowerRoutes = getLowerRoutes(role);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState<any>({});

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  const toggleDropDown = (linkKey: any) => {
    setDropDownOpen((prevState: any) => ({
      ...prevState,
      [linkKey]: !prevState[linkKey],
    }));
  };
  const drawer = (
    <>
      <Box sx={{ padding: '0px 0px 20px 10px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Image src={LogoImage} alt="logo" />
          <Box>
            <Typography variant="subtitle2">Air Applecart</Typography>
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 800,
                color: theme.palette.primary.main,
              }}
            >
              {role.replaceAll('_', ' ')}
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
              routes.map((link: any) => (
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
                            sx={styles.mainNavLink(link, router, theme)}
                            onClick={() => toggleDropDown(link.key)}
                          >
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <Image
                                src={link.icon}
                                alt="icons"
                                style={{
                                  opacity:
                                    router.pathname === link.key ||
                                    dropDownOpen[link.key]
                                      ? '1'
                                      : '0.4',
                                }}
                              />
                            </ListItemIcon>

                            {link.label}

                            <Box sx={{ paddingLeft: '15px' }}>
                              <Image
                                src={
                                  dropDownOpen[link.key]
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
                        in={dropDownOpen[link.key]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {link.textNames.map((subItem: any) => (
                            <ListItem key={uuidv4()} sx={{ padding: '0px' }}>
                              <ListItemButton
                                sx={styles.collapseMenu(subItem, router, theme)}
                              >
                                <Link href={`${subItem.key}`}>
                                  <Box sx={styles.dropdownChildren(theme)}>
                                    {subItem.label}
                                  </Box>
                                </Link>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <Link key={uuidv4()} href={`/${link.key}`}>
                      <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                        <ListItemButton
                          sx={styles.mainNavLink(link, router, theme)}
                        >
                          <ListItemIcon sx={{ minWidth: 20 }}>
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
              lowerRoutes.map((link: any) => (
                <div key={uuidv4()}>
                  {link.textNames ? (
                    <>
                      <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                        <Link href={`${link.key}`} style={{ width: '100%' }}>
                          <ListItemButton
                            sx={styles.mainNavLink(link, router, theme)}
                            onClick={() => toggleDropDown(link.key)}
                          >
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <Image
                                src={link.icon}
                                alt="icons"
                                style={{
                                  opacity:
                                    router.pathname === link.key ||
                                    dropDownOpen[link.key]
                                      ? '1'
                                      : '0.4',
                                }}
                              />
                            </ListItemIcon>

                            {link.label}
                            <Box sx={{ paddingLeft: '20px' }}>
                              <Image
                                src={
                                  dropDownOpen[link.key]
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
                        in={dropDownOpen[link.key]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {link.textNames.map((subItem: any) => (
                            <ListItem key={uuidv4()} sx={{ padding: '0px' }}>
                              <ListItemButton
                                sx={styles.collapseMenu(subItem, router, theme)}
                              >
                                <Link href={`${subItem.key}`}>
                                  <Box sx={styles.dropdownChildren(theme)}>
                                    {subItem.label}
                                  </Box>
                                </Link>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <Link key={uuidv4()} href={`${link.key}`}>
                      <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
                        <ListItemButton
                          sx={styles.mainNavLink(link, router, theme)}
                        >
                          <ListItemIcon sx={{ minWidth: 20 }}>
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
      <AppBar sx={styles.appToolbar(drawerWidth, theme)}>
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
          sx={styles.mobileDrawer(drawerWidth)}
        >
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={styles.mainDrawer(drawerWidth)} open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={styles.layoutBox(drawerWidth)}>
        <Toolbar />
        <Box sx={styles.layoutInnerBox(theme)}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
