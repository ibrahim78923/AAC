import { Box, Card, Typography, useTheme } from '@mui/material';

import Table from './Table';

const TotalMarketingEmail = () => {
  const theme = useTheme();
  return (
    <Card>
      <Box p={1.6} sx={{ backgroundColor: theme?.palette?.grey[700] }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">Total marketing Email</Typography>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.grey[900] }}
            >
              Date range In last 30 days
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box pb={3}>
        <Table />
      </Box>
    </Card>
  );
};
export default TotalMarketingEmail;
