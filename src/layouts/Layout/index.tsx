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
  ListItemText,
  Collapse,
} from '@mui/material';

import Header from './Header';

import { isNullOrEmpty } from '@/utils';

import { LowerSuperAdminItems, SuperAdminItems } from './Layout.data';

import { LayoutI } from './Layout.interface';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { LogoImage, LogoutImage } from '@/assets/images';

import { styles } from './Layout.style';

import { v4 as uuidv4 } from 'uuid';

const drawerWidth = 220;

const Layout = (props: LayoutI) => {
  const theme = useTheme();
  const { window, children } = props;
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropDownOpen, setisDropDownOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  const role = 'super-admin';
  const dropDownOpenHandler = () => {
    if (role === 'super-admin') {
      setisDropDownOpen(!isDropDownOpen);
    } else {
      router.push('/sale-settings');
    }
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
          {!isNullOrEmpty(SuperAdminItems) &&
            SuperAdminItems.map((link) => (
              <Link
                key={uuidv4()}
                href={`${link.key}`}
                onClick={() => setisDropDownOpen(false)}
              >
                {link.role.includes(role) && (
                  <ListItem key={link.key} sx={{ padding: '6px 0px 6px 0px' }}>
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
                )}
              </Link>
            ))}
        </Box>
        <Box sx={{ paddingBottom: '20px' }}>
          <List component="nav" aria-labelledby="nested-list-subheader">
            {!isNullOrEmpty(LowerSuperAdminItems) &&
              LowerSuperAdminItems.map((item) => (
                <div key={uuidv4()}>
                  {item.role.includes(role) && (
                    <ListItem style={{ padding: '6px 0px' }}>
                      <ListItemButton
                        onClick={dropDownOpenHandler}
                        sx={styles.collapseMenuOpener(
                          item,
                          router,
                          isDropDownOpen,
                          theme,
                        )}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Image
                            src={item.logo}
                            alt="icons"
                            style={{
                              opacity:
                                router.pathname.includes(`${item.name}`) ||
                                isDropDownOpen
                                  ? '1'
                                  : '0.4',
                            }}
                          />
                        </ListItemIcon>
                        {item.name}
                        <ListItemText />
                        {role === 'super-admin' ? (
                          isDropDownOpen ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )
                        ) : null}
                      </ListItemButton>
                    </ListItem>
                  )}

                  {item.textNames && (
                    <Collapse in={isDropDownOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.textNames.map((subItem) => (
                          <Link key={uuidv4()} href={`${subItem.key}`}>
                            <ListItemButton
                              key={item.name}
                              sx={styles.collapseMenu(subItem, router, theme)}
                            >
                              <Link key={uuidv4()} href={`${subItem.key}`}>
                                {subItem.label}
                              </Link>
                            </ListItemButton>
                          </Link>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
          </List>
          <Link key={uuidv4()} href={`/logout`}>
            <ListItemButton
              sx={{
                fontSize: '14px',
                '&:hover': {
                  background: 'transparent',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Image
                  src={LogoutImage}
                  alt="LogoutIcon"
                  style={{
                    opacity: '0.4',
                  }}
                />
              </ListItemIcon>
              Logout
            </ListItemButton>
          </Link>
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
