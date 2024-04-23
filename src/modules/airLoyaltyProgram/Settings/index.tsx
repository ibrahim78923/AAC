import { Divider, Box, Typography } from '@mui/material';
import { useSettings } from './useSettings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_LOYALTY_PROGRAM_SETTINGS_ACCOUNT_PERMISSIONS,
  AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS,
} from '@/constants/permission-keys';

export const Settings = () => {
  const { settingsData, activeModule, renderSettingsModule } = useSettings();
  return (
    <Box
      width={'100%'}
      display="flex"
      gap={1}
      flexWrap={'wrap'}
      flexDirection={{ xs: 'column', sm: 'row' }}
    >
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_SETTINGS_ACCOUNT_PERMISSIONS?.ACCOUNT_GENERAL ||
            AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.VIEW_SHOP_DETAILS,
        ]}
      >
        <Box paddingRight={2} flex={0.25}>
          <Typography mb={2} variant="h3" color="slateBlue.main">
            Settings
          </Typography>
          <Divider />
          <Box paddingY={2}>
            {settingsData?.map((item: any) => (
              <item.component key={item?.id} {...item?.componentProps}>
                {item?.heading}
              </item.component>
            ))}
          </Box>
        </Box>
        <Divider orientation="vertical" variant="fullWidth" flexItem />
        <Box flex={1} paddingX={2}>
          {renderSettingsModule?.[activeModule]}
        </Box>
      </PermissionsGuard>
    </Box>
  );
};
