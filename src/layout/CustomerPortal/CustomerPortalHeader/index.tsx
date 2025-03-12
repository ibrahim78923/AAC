import { AUTH } from '@/constants';
import Header from '@/layout/Header';
import { AppBar, Box, useTheme } from '@mui/material';
import {
  customizePortalDefaultValues,
  drawerWidth,
} from '../CustomerPortal.data';
import { customerPortalStyles } from '../CustomerPortal.styles';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { LinkButton } from '@/components/Buttons/LinkButton';

export const CustomerPortalHeader = (props: any) => {
  const {
    setIsMobileOpen,
    user,
    customerPortalStyling,
    hasPermissions,
    companyId,
  } = props;

  const theme = useTheme();

  const openMobile = () => setIsMobileOpen(true);

  return (
    <AppBar sx={customerPortalStyles?.appToolbarStyles(drawerWidth, theme)}>
      {user ? (
        <Header handleDrawerToggle={openMobile} />
      ) : (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          gap={2}
        >
          <LinkButton
            link={AUTH?.LOGIN}
            variant={'outlined'}
            customStyles={{
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
            name="Sign In"
          />

          {hasPermissions && (
            <LinkButton
              link={{
                pathname: AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_SIGN_UP,
                ...(companyId && { query: { companyId } }),
              }}
              variant={'contained'}
              customStyles={{
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
              name="Sign Up"
            />
          )}
        </Box>
      )}
    </AppBar>
  );
};
