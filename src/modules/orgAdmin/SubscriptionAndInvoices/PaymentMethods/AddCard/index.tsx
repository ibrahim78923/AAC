import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  useTheme,
  FormLabel,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import {
  useGetPaymentCardByIdQuery,
  usePostPaymentCardMutation,
} from '@/services/orgAdmin/subscription-and-invoices';
import { getSession, isNullOrEmpty } from '@/utils';
import { LoadingButton } from '@mui/lab';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const AddCard = ({
  open,
  onClose,
  openEditCard,
  isGetRowValues,
  setOpenAddCard,
  setIsGetRowValues,
}: any) => {
  const { data, status } = useGetPaymentCardByIdQuery(
    { id: isGetRowValues[0] },
    { skip: openEditCard != 'View' || isNullOrEmpty(isGetRowValues) },
  );

  const [isDefault, setIsDefault] = useState(false);
  const [isSecureTransaction, setIsSecureTransaction] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState('');
  const { user }: any = getSession();
  const [postPaymentCard, { isLoading: PostPaymentCardLoading }] =
    usePostPaymentCardMutation();
  const theme = useTheme();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement, {
      name: cardHolderName, // Pass cardholder's name here
    });

    if (error) {
      errorSnackbar(error?.message);
      return;
    } else {
      const payload = {
        stripeCustomerId: user?.stripeCustomerId,
        cardToken: token?.id,
        useCompanyAddress: true,
        secureTransaction: isSecureTransaction,
        isDefault: isDefault,
      };

      try {
        await postPaymentCard({ body: payload })?.unwrap();
        successSnackbar('Card Added Successful');
        onClose();
      } catch (error: any) {
        errorSnackbar(error?.data?.message);
      }
    }
    setCardHolderName('');
  };

  const handleCardHolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e?.target?.value;
    const textOnlyValue = value?.replace(/[0-9]/g, ''); // Remove numeric characters
    setCardHolderName(textOnlyValue);
  };

  const handleCloseAddCard = () => {
    setOpenAddCard(false);
    setCardHolderName('');
    setIsDefault(false);
    setIsSecureTransaction(false);
    setIsGetRowValues([]);
  };

  useEffect(() => {
    setCardHolderName(data?.data?.cardHolderName);
    setIsDefault(data?.data?.isDefault);
    setIsSecureTransaction(data?.data?.secureTransaction);
  }, [status === 'fulfilled']);

  useEffect(() => {
    setCardHolderName('');
    setIsDefault(false);
    setIsSecureTransaction(false);
  }, [openEditCard === 'Add']);

  return (
    <Dialog
      open={open}
      onClose={handleCloseAddCard}
      fullWidth={true}
      maxWidth={'sm'}
    >
      {status === 'pending' ? (
        <Box
          sx={{ height: '400px' }}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <DialogTitle
            sx={{
              fontWeight: '700',
              fontSize: '20px !important',
              marginBottom: '10px',
            }}
          >
            {openEditCard === 'Add'
              ? 'Add a debit or credit Card'
              : 'View Card Details'}
          </DialogTitle>
          <DialogContent>
            <Box style={{ marginBottom: '10px' }}>
              <FormLabel
                htmlFor="cardholder-name"
                style={{
                  fontSize: '14px',
                  marginBottom: '5px',
                  display: 'block',
                }}
              >
                Cardholder Name
              </FormLabel>
              <TextField
                id="cardholder-name"
                variant="outlined"
                placeholder="Enter Cardholder Name"
                value={cardHolderName}
                onChange={handleCardHolderNameChange}
                required
                fullWidth
                size="small"
                disabled={openEditCard === 'View'}
                InputProps={{
                  style: {
                    borderRadius: '5px',
                    fontSize: '16px',
                  },
                }}
                inputProps={{
                  style: {
                    color: '#424770',
                  },
                }}
              />
            </Box>

            {isNullOrEmpty(isGetRowValues) ? (
              <Box
                sx={{
                  border: `1px solid #0000003b`,
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <CardElement
                  options={{
                    hidePostalCode: true,
                    style: {
                      base: {
                        fontSize: '16px',
                        color: theme?.palette?.grey[500],
                        '::placeholder': {
                          color: theme?.palette?.custom?.sliver_grey,
                        },
                      },
                    },
                  }}
                />
              </Box>
            ) : (
              <Box marginBottom={1}>
                <Typography variant="body2" color="textSecondary">
                  <b>Saved Card :</b> {data?.data?.brand} ending in{' '}
                  {data?.data?.last4}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <b>Expiration: </b> {data?.data?.expMonth}/
                  {data?.data?.expYear}
                </Typography>
              </Box>
            )}

            <Box sx={{ marginTop: '10px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    color="primary"
                    disabled={openEditCard === 'View'}
                  />
                }
                label="Default"
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isSecureTransaction}
                  onChange={(e) => setIsSecureTransaction(e.target.checked)}
                  color="primary"
                  disabled={openEditCard === 'View'}
                />
              }
              label="Secure Transaction"
            />
          </DialogContent>
          <DialogActions>
            {isNullOrEmpty(isGetRowValues) && (
              <LoadingButton
                variant="contained"
                type="submit"
                loading={PostPaymentCardLoading}
              >
                Add
              </LoadingButton>
            )}

            <Button variant="outlined" onClick={handleCloseAddCard}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default AddCard;
