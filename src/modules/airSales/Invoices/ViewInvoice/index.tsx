import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';

import { AIR_SALES } from '@/routesConstants/paths';
import { useTheme } from '@mui/material/styles';
import TanstackTable from '@/components/Table/TanstackTable';
import DetailCard from '../CreateInvoice/EditDetails/DetailCard';
import { productsTableColumns, productsTableData } from './ViewInvoice.data';
import { productTotalDetails } from '../CreateInvoice/EditDetails/EditDetails.data';
import { style } from './ViewInvoice.style';
import { v4 as uuidv4 } from 'uuid';

export const ViewInvoice = (props?: any) => {
  const { isOnlyView } = props;
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box>
      {!isOnlyView && (
        <Typography variant="h3" mb={3}>
          Invoice
        </Typography>
      )}
      <DetailCard />
      <Card sx={{ my: '20px' }}>
        <Box p="16px 24px">
          <Typography variant="h5">Products & Services</Typography>
        </Box>
        <TanstackTable
          columns={productsTableColumns}
          data={productsTableData}
        />
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} lg={8} xl={9}>
          <TextareaAutosize
            placeholder="Comments"
            style={{ width: '100%', height: '203px', padding: '16px' }}
          />
        </Grid>
        <Grid item xs={12} sm={5} lg={4} xl={3}>
          <Card
            sx={{
              p: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardContent sx={{ padding: '11px 20px' }}>
              {productTotalDetails?.map((item: any) => (
                <Box key={uuidv4()}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                  >
                    <Typography variant="h5" fontWeight={500}>
                      {item?.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={500}>
                      {item?.value}
                    </Typography>
                  </Stack>
                  <Stack my={1} gap={1}>
                    {item?.detail?.map((val: any) => (
                      <Stack
                        key={uuidv4()}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={2}
                      >
                        <Typography variant="body2">{val?.title}</Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {val?.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
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
                  <Typography variant="body2" fontWeight={500}>
                    Discount
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ color: theme?.palette?.custom?.dark }}
                >
                  0%
                </Typography>
              </Box>
            </CardContent>
            <CardActions
              sx={{
                padding: '14px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#E5E7EB',
              }}
            >
              <Typography variant="h5" fontWeight={500}>
                Total
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                £50
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {!isOnlyView && (
        <Box mt={3}>
          <Divider />
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            mt={2}
          >
            <Button
              sx={style.cancelButton(theme?.palette)}
              onClick={() => router?.push(AIR_SALES?.SALES_INVOICES)}
            >
              Back
            </Button>
            <Button variant="contained">Download</Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};
