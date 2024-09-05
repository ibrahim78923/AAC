import { useMemo } from 'react';
import Image from 'next/image';
import {
  AppBar,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  CssBaseline,
  List,
  Typography,
  Drawer,
  Skeleton,
  Button,
} from '@mui/material';
import { AirCustomerPortalLogo, LogoutImage } from '@/assets/images';
import { styles } from '../Layout.style';
import Link from 'next/link';
import { drawerWidth } from './CustomerPortal.data';
import { ARRAY_INDEX } from '@/constants/strings';
import Header from '../Header';
import useCustomerPortal from './useCustomerPortal';
import { AIR_CUSTOMER_PORTAL, AUTH } from '@/constants';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';

const CustomerPortalLayout = ({
  children,
  window,
}: {
  children: React.ReactNode;
  window?: any;
}) => {
  const {
    theme,
    router,
    user,
    logout,
    companyId,
    getPublicCustomerPermissionsStatus,
    CustomerPortalRoutes,
    routerPathName,
    isMobileOpen,
    setIsMobileOpen,
    isZeroPaddingRoutes,
    customerPortalPermissions,
    isMounted,
  } = useCustomerPortal();

  const drawerContent = useMemo(
    () => (
      <>
        {getPublicCustomerPermissionsStatus?.isLoading ||
        getPublicCustomerPermissionsStatus?.isFetching ? (
          <Box sx={{ width: '100%' }}>
            {[1, 2, 3, 4]?.map((index) => (
              <Skeleton
                key={index}
                variant="rectangular"
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
                <Image
                  src={AirCustomerPortalLogo}
                  alt="Air Apple Cart"
                  width={153}
                  height={38}
                  style={{ objectFit: 'contain' }}
                />
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
                  {CustomerPortalRoutes?.map((item) => {
                    const pathNameKey =
                      item?.key?.split('/')[ARRAY_INDEX?.TWO] ??
                      item?.key?.split('/')[ARRAY_INDEX?.ONE];
                    return (
                      <Link
                        key={item?.key}
                        href={{
                          pathname: item?.key,
                          ...(companyId && { query: { companyId } }),
                        }}
                      >
                        {item?.permissions && (
                          <ListItem sx={{ padding: '6px 0px 6px 0px' }}>
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
                                <Box
                                  display="flex"
                                  sx={{
                                    opacity:
                                      routerPathName === pathNameKey
                                        ? '1'
                                        : '0.4',
                                  }}
                                >
                                  <item.icon />
                                </Box>
                              </ListItemIcon>
                              {item?.label}
                            </ListItemButton>
                          </ListItem>
                        )}
                      </Link>
                    );
                  })}
                </List>
              </Box>

              {user && (
                <Box sx={{ paddingBottom: '20px' }}>
                  <List>
                    <ListItem
                      sx={{ padding: '6px 0px 6px 0px' }}
                      onClick={logout}
                    >
                      <ListItemButton
                        sx={styles?.mainNavLink('link', router, theme)}
                      >
                        <ListItemIcon
                          sx={{ minWidth: 20, marginRight: '10px' }}
                        >
                          <Image
                            src={LogoutImage}
                            alt="Logout"
                            style={{ opacity: '0.4' }}
                          />
                        </ListItemIcon>
                        <Typography fontWeight={500} fontSize={14}>
                          Logout
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              )}
            </Box>
          </>
        )}
      </>
    ),
    [
      getPublicCustomerPermissionsStatus,
      CustomerPortalRoutes,
      routerPathName,
      theme,
      logout,
      user,
    ],
  );

  const container =
    typeof window !== 'undefined' ? window?.document?.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={styles?.appToolbar(drawerWidth, theme)}>
        {user ? (
          <Header handleDrawerToggle={() => setIsMobileOpen(true)} />
        ) : (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap={2}
          >
            <Link href={AUTH?.LOGIN}>
              <Button variant={'outlined'} color={'inherit'}>
                Sign In
              </Button>
            </Link>

            {isMounted &&
              customerPortalPermissions?.includes(
                AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_ALLOW_SIGNUP_FROM_CS,
              ) && (
                <Link
                  href={{
                    pathname: AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_SIGN_UP,
                    ...(companyId && { query: { companyId } }),
                  }}
                >
                  <Button
                    variant={'contained'}
                    color={'primary'}
                    disableElevation
                  >
                    Sign Up
                  </Button>
                </Link>
              )}
          </Box>
        )}
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
          onClose={() => setIsMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={styles?.mobileDrawer(drawerWidth)}
        >
          {drawerContent}
        </Drawer>
        <Drawer variant="permanent" sx={styles?.mainDrawer(drawerWidth)} open>
          {drawerContent}
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

export default CustomerPortalLayout;
