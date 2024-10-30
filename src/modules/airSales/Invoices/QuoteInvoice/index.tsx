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
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import DetailCard from './DetailCard';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  productTotalDetails,
  productsTableColumns,
  sendEmailFormField,
} from './QuoteInvoice.data';
import useQuoteInvoice from './useQuoteInvoice';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AIR_SALES } from '@/routesConstants/paths';
import CommonModal from '@/components/CommonModal';

const QuoteInvoice = ({ quoteId }: any) => {
  const theme = useTheme();
  const router = useRouter();
  const {
    fetchingQuoteById,
    loadingQuoteById,
    isSuccess,
    quoteDataById,
    methodsBankAccounts,
    bankAccountsList,
    handleAddInvoiceSubmit,
    comments,
    setComments,
    accountNo,
    isEmailModal,
    openModalEmail,
    closeModalEmail,
    methodsSendEmail,
    loadingPostInvoice,
    unitDiscount,
    subtotal,
  } = useQuoteInvoice(quoteId);

  return (
    <Box>
      <DetailCard
        buyerCompany={quoteDataById?.buyerCompany || {}}
        buyerContact={quoteDataById?.buyerContact || {}}
        isLoading={fetchingQuoteById || loadingQuoteById}
        isSuccess={isSuccess}
      />

      <Card sx={{ my: '20px' }}>
        <Box p="16px 24px">
          <Typography variant="h5">Products & Services</Typography>
        </Box>
        <TanstackTable
          columns={productsTableColumns}
          data={quoteDataById?.products}
          isLoading={fetchingQuoteById || loadingQuoteById}
        />
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} lg={8} xl={9}>
          <Box
            sx={{
              height: '100%',
            }}
          >
            <TextField
              fullWidth
              value={comments}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setComments(event.target.value);
              }}
              sx={{ height: '100%' }}
              placeholder="Comments..."
              multiline
              rows={7}
            />
          </Box>
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
              {productTotalDetails(subtotal, unitDiscount)?.map((item: any) => (
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                my="10px"
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
                    Total Redeemed Discount
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ color: theme?.palette?.custom?.dark }}
                >
                  £ 20
                </Typography>
              </Box>
            </CardContent>
            <CardActions
              sx={{
                padding: '14px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: (theme: any) => theme?.palette?.grey[700],
              }}
            >
              <Typography variant="h5" fontWeight={500}>
                Total
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                £{subtotal - unitDiscount}
              </Typography>
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <FormProvider methods={methodsBankAccounts}>
            <RHFAutocompleteAsync
              name="bankAccount"
              label={'Select Bank Account'}
              fullWidth
              required
              size="small"
              apiQuery={bankAccountsList}
              // externalParams={{}}
              getOptionLabel={(option: any) =>
                `${option?.bankName} -- ${option?.accountHolder}`
              }
              placeholder="Select Bank Account"
            />
          </FormProvider>
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
            onClick={() => router.push(AIR_SALES?.SALES_INVOICES)}
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
              onClick={() => router.push(AIR_SALES?.SALES_INVOICES)}
            >
              Cancel
            </Button>
            <Button
              sx={{ textTransform: 'none' }}
              variant="contained"
              className="medium"
              onClick={openModalEmail}
              disabled={accountNo === ''}
            >
              Send to customer
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <CommonModal
        title="Send to a customer"
        open={isEmailModal}
        handleClose={closeModalEmail}
        handleCancel={closeModalEmail}
        handleSubmit={handleAddInvoiceSubmit}
        okText="Send"
        cancelText="Cancel"
        footer={true}
        isLoading={loadingPostInvoice}
      >
        <FormProvider methods={methodsSendEmail}>
          <Grid container>
            {sendEmailFormField?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonModal>
    </Box>
  );
};

export default QuoteInvoice;
