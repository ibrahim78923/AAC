import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import DetailCard from '../CreateInvoice/EditDetails/DetailCard';
import { style } from './ViewInvoice.style';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

export const ViewInvoice = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h3">Invoice</Typography>
      <DetailCard />
      <Box mt={3}>
        <Divider />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Button
            sx={style.cancelButton(theme.palette)}
            onClick={() => router.push('/sales-invoices')}
          >
            Back
          </Button>
          <Button variant="contained">Download</Button>
        </Stack>
      </Box>
    </Box>
  );
};
