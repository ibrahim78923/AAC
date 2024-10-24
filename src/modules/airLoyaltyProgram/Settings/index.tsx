import { Box, Typography } from '@mui/material';
import { useSettings } from './useSettings';
import { renderSettingsModule } from './Settings.data';

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
            <item.component key={item?.id} {...item?.componentProps}>
              {item?.heading}
            </item.component>
          ))}
        </Box>
      </Box>
      <Box
        flex={1}
        paddingX={2}
        sx={{
          borderLeft: { md: 1, xs: 0 },
          borderTop: { xs: 1, md: 0 },
          borderLeftColor: { md: 'custom.off_white_three', xs: '' },
          borderTopColor: { xs: 'custom.off_white_three', md: '' },
        }}
        overflow={'auto'}
        maxWidth={'100%'}
      >
        {renderSettingsModule?.[activeModule]}
      </Box>
    </Box>
  );
};
