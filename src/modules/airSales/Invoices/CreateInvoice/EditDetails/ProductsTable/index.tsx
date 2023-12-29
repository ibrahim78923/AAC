import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextareaAutosize,
  Card,
  CardActions,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Grid,
} from '@mui/material';
import { AddCircleRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { productTotalDetails } from '../EditDetails.data';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  productsTableColumns,
  productsTableData,
} from '../../../Invoices.data';
import AddProducts from '../AddProducts';
import { AlertModals } from '@/components/AlertModals';
import useInvoices from '../../../useInvoices';
import { PlusIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';

const ProductsTable = () => {
  const [isDiscount, setIsDiscount] = useState(false);
  const theme = useTheme();
  const { isDeleteModal, setIsDeleteModal, isDrawerOpen, setIsDrawerOpen } =
    useInvoices();
  const getTableColumns = productsTableColumns(
    setIsDeleteModal,
    setIsDrawerOpen,
  );

  return (
    <Box my={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        my={2}
        gap={1}
      >
        <Typography variant="h5">Products</Typography>
        <Button
          variant="contained"
          startIcon={<PlusIcon />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Add Products
        </Button>
      </Stack>
      <Box my={3}>
        <TanstackTable columns={getTableColumns} data={productsTableData} />
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
                  onClick={() => {
                    setIsDiscount(true);
                  }}
                >
                  {!isDiscount && <AddCircleRounded />}
                  <Typography variant="body2" fontWeight={500}>
                    Discount
                  </Typography>
                </Box>
                {!isDiscount ? (
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ color: theme?.palette?.custom?.dark }}
                  >
                    0%
                  </Typography>
                ) : (
                  <TextField
                    type="number"
                    sx={{
                      '& input': {
                        width: '10px',
                        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button':
                          {
                            '-webkit-appearance': 'none',
                          },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                      inputProps: { min: 0, max: 100 },
                    }}
                    size="small"
                  />
                )}
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
