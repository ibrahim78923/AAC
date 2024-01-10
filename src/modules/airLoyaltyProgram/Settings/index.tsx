import { Divider, Box, Typography } from '@mui/material';
import { useSettings } from './useSettings';

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
      <Box paddingRight={2} flex={0.25}>
        <Typography mb={2}>Settings</Typography>
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
    </Box>
  );
};
