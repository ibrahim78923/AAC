import { useMemo } from 'react';
import { Box, Toolbar, Drawer } from '@mui/material';
import {
  customizePortalDefaultValues,
  drawerWidth,
} from './CustomerPortal.data';
import useCustomerPortal from './useCustomerPortal';
import { customerPortalStyles } from './CustomerPortal.styles';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Sidebar } from './Sidebar';
import { CustomerPortalHeader } from './CustomerPortalHeader';

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
    customerLogoutHandler,
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
    loadChildren,
  } = useCustomerPortal();

  const drawerContent = useMemo(
    () => (
      <Sidebar
        isFetching={isFetching}
        customerPortalStyling={customerPortalStyling}
        customerPortalStyles={customerPortalStyles}
        companyId={companyId}
        customerPortalRoutes={customerPortalRoutes}
        routerPathName={routerPathName}
        user={user}
        reducedOpacityBgColor={reducedOpacityBgColor}
        customerLogoutHandler={customerLogoutHandler}
      />
    ),
    [
      isFetching,
      customerPortalRoutes,
      routerPathName,
      companyId,
      customerLogoutHandler,
      user,
      customerPortalStyling,
      reducedOpacityBgColor,
    ],
  );

  const container =
    typeof window !== 'undefined' ? window?.document?.body : undefined;

  return (
    isMounted && (
      <Box display={'flex'}>
        <CustomerPortalHeader
          setIsMobileOpen={setIsMobileOpen}
          user={user}
          customerPortalStyling={customerPortalStyling}
          hasPermissions={hasPermissions}
          companyId={companyId}
        />
        <Box
          component={'nav'}
          width={{ md: drawerWidth }}
          flexShrink={{ md: 0 }}
          aria-label={'mailbox folders'}
        >
          {isMobileOpen && (
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
          )}
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
            {loadChildren ? children : <SkeletonTable />}
          </Box>
        </Box>
      </Box>
    )
  );
};

export default CustomerPortalLayout;
