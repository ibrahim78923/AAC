import { Box, Typography, Theme, useTheme } from '@mui/material';
import Setup from './Setup';

const Forecast = () => {
  const theme = useTheme<Theme>();

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
        <Typography variant="h3" mb={2}>
          Forecast
        </Typography>
        <Setup />
      </Box>
    </>
  );
};

export default Forecast;
