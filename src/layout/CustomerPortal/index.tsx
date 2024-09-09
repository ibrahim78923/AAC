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
  Drawer,
  Skeleton,
  Button,
} from '@mui/material';
import { AirCustomerPortalLogo } from '@/assets/images';
import Link from 'next/link';
import {
  customizePortalDefaultValues,
  drawerWidth,
} from './CustomerPortal.data';
import { ARRAY_INDEX } from '@/constants/strings';
import Header from '../Header';
import useCustomerPortal from './useCustomerPortal';
import { AIR_CUSTOMER_PORTAL, AUTH } from '@/constants';
import { generateImage } from '@/utils/avatarUtils';
import { customerPortalStyles } from './CustomerPortal.styles';
import { CustomerLogoutIcon } from '@/assets/icons';

const CustomerPortalLayout = ({
  children,
  window,
}: {
  children: React.ReactNode;
  window?: any;
}) => {
  const {
    theme,
    user,
    logout,
    companyId,
    customerPortalRoutes,
    routerPathName,
    isMobileOpen,
    setIsMobileOpen,
    isZeroPaddingRoutes,
    isMounted,
    customerPortalStyling,
    reducedOpacityBgColor,
    hasPermissions,
    isFetching,
  } = useCustomerPortal();

  const drawerContent = useMemo(
    () => (
      <>
        {isFetching ? (
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
            <Box p={'0px 0px 20px 10px'}>
              <Box display={'flex'} flexDirection={'row'} gap={1}>
                {customerPortalStyling?.logo ? (
                  <Image
                    src={generateImage(customerPortalStyling?.logo?.url)}
                    alt={'Air Apple Cart'}
                    width={153}
                    height={38}
                    style={{ objectFit: 'contain' }}
                  />
                ) : (
                  <Image
                    src={AirCustomerPortalLogo}
                    alt={'Air Apple Cart'}
                    width={153}
                    height={38}
                    style={{ objectFit: 'contain' }}
                  />
                )}
              </Box>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              flexDirection={'column'}
              height={'100%'}
            >
              <List>
                {customerPortalRoutes?.map((item) => {
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
                            sx={customerPortalStyles?.listNavBarStyles(
                              routerPathName,
                              pathNameKey,
                              reducedOpacityBgColor,
                              customerPortalStyling ||
                                customizePortalDefaultValues(theme),
                            )}
                          >
                            <ListItemIcon sx={{ mr: 1 }}>
                              <Box
                                display={'flex'}
                                bgcolor={
                                  customerPortalStyling?.iconSecondary ||
                                  customizePortalDefaultValues(theme)
                                    ?.iconSecondary
                                }
                                sx={{
                                  opacity:
                                    routerPathName === pathNameKey
                                      ? '1'
                                      : '0.4',
                                }}
                              >
                                <item.icon
                                  fill={
                                    customerPortalStyling?.iconPrimary ||
                                    customizePortalDefaultValues(theme)
                                      ?.iconPrimary
                                  }
                                />
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

              {user && (
                <Box pb={2}>
                  <List>
                    <ListItem
                      sx={{ padding: '6px 0px 6px 0px' }}
                      onClick={logout}
                    >
                      <ListItemButton
                        sx={customerPortalStyles?.logoutButtonStyles(
                          customerPortalStyling ||
                            customizePortalDefaultValues(theme),
                          reducedOpacityBgColor,
                        )}
                      >
                        <ListItemIcon sx={{ marginRight: 1 }}>
                          <Box
                            display={'flex'}
                            bgcolor={
                              customerPortalStyling?.iconSecondary ||
                              customizePortalDefaultValues(theme)?.iconSecondary
                            }
                            sx={{ opacity: '0.4' }}
                          >
                            <CustomerLogoutIcon
                              fill={
                                customerPortalStyling?.iconPrimary ||
                                customizePortalDefaultValues(theme)?.iconPrimary
                              }
                            />
                          </Box>
                        </ListItemIcon>
                        Logout
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
      isFetching,
      customerPortalRoutes,
      routerPathName,
      companyId,
      theme,
      logout,
      user,
      customerPortalStyling,
      reducedOpacityBgColor,
    ],
  );

  const container =
    typeof window !== 'undefined' ? window?.document?.body : undefined;

  return (
    <Box display={'flex'}>
      <CssBaseline />
      <AppBar sx={customerPortalStyles?.appToolbarStyles(drawerWidth, theme)}>
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
              <Button
                variant={'outlined'}
                sx={{
                  borderColor:
                    customerPortalStyling?.btnSecondary ||
                    customizePortalDefaultValues(theme)?.btnSecondary,
                  color:
                    customerPortalStyling?.btnSecondary ||
                    customizePortalDefaultValues(theme)?.btnSecondary,
                  '&:hover': {
                    borderColor:
                      customerPortalStyling?.btnSecondary ||
                      customizePortalDefaultValues(theme)?.btnSecondary,
                    color:
                      customerPortalStyling?.btnSecondary ||
                      customizePortalDefaultValues(theme)?.btnSecondary,
                  },
                }}
                disableElevation
              >
                Sign In
              </Button>
            </Link>

            {isMounted && hasPermissions && (
              <Link
                href={{
                  pathname: AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_SIGN_UP,
                  ...(companyId && { query: { companyId } }),
                }}
              >
                <Button
                  variant={'contained'}
                  sx={{
                    bgcolor:
                      customerPortalStyling?.btnPrimary ||
                      customizePortalDefaultValues(theme)?.btnPrimary,
                    color: 'common.white',
                    '&:hover': {
                      bgcolor:
                        customerPortalStyling?.btnPrimary ||
                        customizePortalDefaultValues(theme)?.btnPrimary,
                      color: 'common.white',
                    },
                  }}
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
        component={'nav'}
        width={{ md: drawerWidth }}
        flexShrink={{ md: 0 }}
        aria-label={'mailbox folders'}
      >
        <Drawer
          container={container}
          variant={'temporary'}
          open={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={customerPortalStyles?.mobileDrawerStyles(
            drawerWidth,
            customerPortalStyling || customizePortalDefaultValues(theme),
          )}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant={'permanent'}
          sx={customerPortalStyles?.mainDrawerStyles(
            drawerWidth,
            customerPortalStyling || customizePortalDefaultValues(theme),
          )}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component={'main'}
        sx={customerPortalStyles?.layoutBoxStyles(drawerWidth, theme)}
      >
        <Toolbar />
        <Box
          sx={customerPortalStyles?.layoutInnerBoxStyle(
            theme,
            isZeroPaddingRoutes,
          )}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerPortalLayout;
