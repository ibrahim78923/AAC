import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { LogoAvatar } from '@/components/Avatars/LogoAvatar';
import { PROJECT_NAME } from '@/config';
import { ARRAY_INDEX, ROLES } from '@/constants/strings';
import { Box, useTheme } from '@mui/material';
import { customizePortalDefaultValues } from '../CustomerPortal.data';
import { AIR_SERVICES } from '@/constants/routes';
import { Fragment } from 'react';
import { CustomerLogoutIcon } from '@/assets/icons';
import { ArrowBack } from '@mui/icons-material';
import { NavLinks } from '@/layout/NavLinks';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const Sidebar = (props: any) => {
  const theme = useTheme();
  const {
    isFetching,
    customerPortalStyling,
    companyId,
    customerPortalRoutes,
    routerPathName,
    user,
    reducedOpacityBgColor,
    customerLogoutHandler,
  } = props;

  if (isFetching)
    return (
      <SkeletonCard
        length={5}
        cardType={SKELETON_TYPES?.SMALL_HORIZONTAL_TWO_LAYER_CIRCULAR_CARD}
      />
    );

  return (
    <>
      <Box sx={{ paddingBottom: 2 }}>
        {customerPortalStyling?.logo ? (
          <CustomAvatar
            avatarSrc={customerPortalStyling?.logo?.url}
            avatarSize={{
              width: '100%',
              height: 38,
              variant: 'square',
            }}
            backgroundColor="transparent"
            nameInitial={PROJECT_NAME}
          />
        ) : (
          <LogoAvatar productName="Customer Portal" />
        )}
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexDirection={'column'}
        height={'100%'}
      >
        <Box>
          {customerPortalRoutes?.map((item: any) => {
            const pathNameKey =
              item?.key?.split('/')[ARRAY_INDEX?.TWO] ??
              item?.key?.split('/')[ARRAY_INDEX?.ONE];
            return (
              <Fragment key={item?.key}>
                {item?.permissions && (
                  <NavLinks
                    iconFill={
                      customerPortalStyling?.iconPrimary ||
                      customizePortalDefaultValues(theme)?.iconPrimary
                    }
                    outerBgColor={reducedOpacityBgColor}
                    Icon={item?.icon}
                    name={item?.label}
                    isActive={routerPathName === pathNameKey}
                    iconBgColor={
                      customerPortalStyling?.iconSecondary ||
                      customizePortalDefaultValues(theme)?.iconSecondary
                    }
                    color={customerPortalStyling?.iconPrimary}
                    link={{
                      pathname: item?.key,
                      ...(companyId && { query: { companyId } }),
                    }}
                  />
                )}
              </Fragment>
            );
          })}

          {[ROLES?.ORG_EMPLOYEE, ROLES?.ORG_ADMIN]?.includes(user?.role) && (
            <NavLinks
              iconFill={
                customerPortalStyling?.iconPrimary ||
                customizePortalDefaultValues(theme)?.iconPrimary
              }
              outerBgColor={reducedOpacityBgColor}
              Icon={ArrowBack}
              name={'Return to Air Services'}
              iconBgColor={
                customerPortalStyling?.iconSecondary ||
                customizePortalDefaultValues(theme)?.iconSecondary
              }
              color={customerPortalStyling?.iconPrimary}
              link={AIR_SERVICES?.DASHBOARD}
            />
          )}
        </Box>

        {user && (
          <Box pb={2}>
            <NavLinks
              iconFill={
                customerPortalStyling?.iconPrimary ||
                customizePortalDefaultValues(theme)?.iconPrimary
              }
              outerBgColor={reducedOpacityBgColor}
              Icon={CustomerLogoutIcon}
              name={'Logout'}
              iconBgColor={
                customerPortalStyling?.iconSecondary ||
                customizePortalDefaultValues(theme)?.iconSecondary
              }
              color={customerPortalStyling?.iconPrimary}
              onClick={customerLogoutHandler}
            />
          </Box>
        )}
      </Box>
    </>
  );
};
