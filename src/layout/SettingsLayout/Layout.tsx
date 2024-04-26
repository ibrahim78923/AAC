import React, { useEffect, useState } from 'react';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { styles } from './Layout.style';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { CallCenterSettingsRoutes } from './Layout.data';
import { usePathname } from 'next/navigation';

const SettingsLayout = ({ children }: any) => {
  const pathname = usePathname();

  const [subMenuOpen, setSubMenuOpen] = useState<any>({});
  const toggleSubmenu = (linkKey: any) => {
    setSubMenuOpen((prevState: any) => ({
      [linkKey]: !prevState[linkKey],
    }));
  };

  useEffect(() => {
    const submenuRoute = pathname?.split('/')[3];
    if (submenuRoute) {
      setSubMenuOpen((prevState: any) => ({
        [submenuRoute]: true,
        ...prevState,
      }));
    }
  }, [pathname]);

  return (
    <Box sx={styles.main}>
      <Box sx={styles.sidebar}>
        <Box sx={styles.sidebarHeader}>
          <Typography variant="h4">Settings</Typography>
        </Box>
        <List component="nav" sx={styles.nav}>
          {CallCenterSettingsRoutes?.map((item: any) => {
            return (
              <Box key={item?.key}>
                {item?.textNames ? (
                  <>
                    <ListItemButton
                      onClick={() => toggleSubmenu(item?.key)}
                      sx={styles.menuItem}
                      className={subMenuOpen[item.key] ? 'open' : 'close'}
                    >
                      <ListItemText primary={item?.label} />
                      {subMenuOpen[item.key] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse
                      in={subMenuOpen[item.key]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item?.textNames?.map((subItem: any) => {
                          return (
                            <Link key={subItem?.label} href={subItem?.key}>
                              <ListItemButton
                                sx={styles.submenuItem}
                                className={
                                  pathname === subItem?.key ? 'selected' : ''
                                }
                              >
                                <ListItemText primary={subItem?.label} />
                              </ListItemButton>
                            </Link>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <Link key={item?.label} href={item?.key}>
                    <ListItemButton
                      sx={styles.menuItem}
                      className={pathname === item?.key ? 'selected' : ''}
                    >
                      <ListItemText primary={item?.label} />
                    </ListItemButton>
                  </Link>
                )}
              </Box>
            );
          })}
        </List>
      </Box>
      <Box sx={styles.content}>{children}</Box>
    </Box>
  );
};

export default SettingsLayout;
