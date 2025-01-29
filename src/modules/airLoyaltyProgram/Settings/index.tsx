import { Box, Typography } from '@mui/material';
import { useSettings } from './useSettings';
import { renderSettingsModule } from './Settings.data';
import { Fragment } from 'react';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const Settings = () => {
  const { settingsData, activeModule } = useSettings();
  return (
    <Box
      minHeight={'80vh'}
      display="flex"
      gap={1}
      flexWrap={'wrap'}
      flexDirection={{ xs: 'column', md: 'row' }}
    >
      <Box paddingRight={2} flex={0.3}>
        <Typography
          pb={2}
          variant="h3"
          color="slateBlue.main"
          borderBottom={1}
          borderColor="custom.off_white_three"
        >
          Settings
        </Typography>
        <Box paddingY={2}>
          {settingsData?.map((item: any) => (
            <Fragment key={item?.id}>
              <PermissionsGuard permissions={item?.permissions}>
                <item.component key={item?.id} {...item?.componentProps}>
                  {item?.heading}
                </item.component>
              </PermissionsGuard>
            </Fragment>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          borderLeft: { md: 1, xs: 0 },
          borderTop: { xs: 1, md: 0 },
          borderLeftColor: { md: 'custom.off_white_three', xs: '' },
          borderTopColor: { xs: 'custom.off_white_three', md: '' },
          pt: { xs: 1, md: 0 },
          paddingX: { xs: 0.5, md: 2 },
          overflow: 'auto',
          maxWidth: '100%',
        }}
      >
        {renderSettingsModule?.[activeModule]}
      </Box>
    </Box>
  );
};
