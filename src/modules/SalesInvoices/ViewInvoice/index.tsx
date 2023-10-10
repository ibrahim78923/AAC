import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import DetailCard from '../CreateInvoice/EditDetails/DetailCard';
import { style } from './ViewInvoice.style';
import { useTheme } from '@mui/material/styles';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { productsTableColumns, productsTableData } from './ViewInvoice.data';
import { productTotalDetails } from '../CreateInvoice/EditDetails/EditDetailsData';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

export const ViewInvoice = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h3">Invoice</Typography>
      <DetailCard />
      <Box my={3}>
        <TanstackTable
          columns={productsTableColumns}
          data={productsTableData}
        />
      </Box>
      <Box>
        <Stack direction={{ xs: 'column', lg: 'row' }} gap={3}>
          <TextareaAutosize minRows={15} cols={180} placeholder="Comments" />
          <Card sx={{ width: { xs: '100%', lg: '325px' }, p: '10px 15px' }}>
            <CardContent>
              {productTotalDetails?.map((item: any) => (
                <Box key={uuidv4()}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography>{item.value}</Typography>
                  </Stack>
                  {item?.detail?.map((val: any) => (
                    <Stack
                      key={uuidv4()}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      my={1}
                    >
                      <Typography>{val.title}</Typography>
                      <Typography>{val.value}</Typography>
                    </Stack>
                  ))}
                </Box>
              ))}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <Typography>Discount</Typography>
                </Box>
                <Typography>£5</Typography>
              </Box>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Total</Typography>
              <Typography variant="h5">£50</Typography>
            </Box>
          </Card>
        </Stack>
      </Box>
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
