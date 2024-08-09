import { Box, Typography, Theme, useTheme } from '@mui/material';
import useForecast from './useForecast';
import CommonTabs from '@/components/Tabs';
import Setup from './Setup';
import Pipeline from './Pipeline';

const Forecast = () => {
  const theme = useTheme<Theme>();
  const { setActiveTab } = useForecast();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          boxShadow: `0px 1px 2px 0px ${theme?.palette?.custom?.dark_shade_green}, 0px 1px 3px 0px ${theme?.palette?.custom?.shade_grey}`,
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4">Forecast</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <CommonTabs
            getTabVal={(val: any) => setActiveTab(val)}
            tabsArray={['Setup', 'pipeline']}
          >
            <Setup />
            <Pipeline />
          </CommonTabs>
        </Box>
      </Box>
    </>
  );
};

export default Forecast;
