import {
  Box,
  Stack,
  Typography,
  TextareaAutosize,
  Card,
  CardActions,
  CardContent,
  InputAdornment,
  Button,
  Grid,
  Divider,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { productTotalDetails } from '../EditDetails.data';
import TanstackTable from '@/components/Table/TanstackTable';
import { productsTableColumns } from '../../../Invoices.data';
import AddProducts from '../AddProducts';
import { AlertModals } from '@/components/AlertModals';
import useInvoices from '../../../useInvoices';
import { v4 as uuidv4 } from 'uuid';
import { ArrowDownIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import { isNullOrEmpty } from '@/utils';

const ProductsTable = (data: any) => {
  const theme = useTheme();
  const router = useRouter();
  const { isDeleteModal, setIsDeleteModal, isDrawerOpen, setIsDrawerOpen } =
    useInvoices();
  const getTableColumns = productsTableColumns();
  // setIsDeleteModal,
  // setIsDrawerOpen,

  return (
    <Box my={3}>
      <Box my={3}>
        {isNullOrEmpty(data?.data) ? (
          ''
        ) : (
          <TanstackTable
            columns={getTableColumns}
            data={data?.data?.products}
          />
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} lg={8} xl={9}>
          <TextareaAutosize
            placeholder="Comments"
            style={{
              width: '100%',
              height: '203px',
              padding: '16px',
              fontSize: '14px',
            }}
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
                backgroundColor: `${theme?.palette?.grey[700]}`,
              }}
            >
              <Typography variant="h5" fontWeight={500}>
                Total
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                {isNullOrEmpty(data) ? '----' : data?.total}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <InputLabel id="demo-simple-select-label">
            Select Bank Account
          </InputLabel>
          <Select
            sx={{
              '& .css-2kf82o-MuiSvgIcon-root-MuiSelect-icon': {
                display: 'none',
              },
            }}
            fullWidth
            labelId="demo-simple-select-label"
            endAdornment={
              <InputAdornment position="end">
                <ArrowDownIcon
                  sx={{ color: `${theme?.palette?.custom?.main}` }}
                />
              </InputAdornment>
            }
          >
            <MenuItem value={10}>SCBL 1587 1254 32569 452226</MenuItem>
            <MenuItem value={20}>SCBL 1587 1254 32569 452226</MenuItem>
            <MenuItem value={30}>SCBL 1587 1254 32569 452226</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Divider
        sx={{ border: `1px solid ${theme?.palette?.grey[700]}`, my: 2 }}
      />
      <Grid container>
        <Grid item lg={6}>
          <Button
            variant="outlined"
            className="medium"
            sx={{
              border: `1px solid ${theme?.palette?.grey[700]}`,
              color: `${theme?.palette?.custom?.main}`,
              '&:hover': {
                border: `1px solid ${theme?.palette?.grey[100]}`,
                color: `${theme?.palette?.custom?.main}`,
              },
            }}
            onClick={() => router?.back()}
          >
            Back
          </Button>
        </Grid>
        <Grid item lg={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}
          >
            <Button
              variant="outlined"
              className="medium"
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                color: `${theme?.palette?.custom?.main}`,
                '&:hover': {
                  border: `1px solid ${theme?.palette?.grey[100]}`,
                  color: `${theme?.palette?.custom?.main}`,
                },
              }}
              onClick={() => router?.back()}
            >
              Cancel
            </Button>
            <Button variant="contained" className="medium">
              Send to Customer
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* delete modal */}
      {isDeleteModal && (
        <AlertModals
          message="You're about to delete all record. Deleted records can't be restored after 90 days."
          type="delete"
          open={isDeleteModal}
          handleClose={() => setIsDeleteModal(false)}
          handleSubmit={() => setIsDeleteModal(false)}
        />
      )}
      <AddProducts
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </Box>
  );
};

export default ProductsTable;
