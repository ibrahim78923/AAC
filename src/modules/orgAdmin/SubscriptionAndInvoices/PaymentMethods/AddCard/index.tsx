import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

// import { defaultValues, validationSchema } from './AddCard.data';
// import CommonDrawer from '@/components/CommonDrawer';
// import { FormProvider } from '@/components/ReactHookForm';
// import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { v4 as uuidv4 } from 'uuid';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { usePostPaymentCardMutation } from '@/services/orgAdmin/subscription-and-invoices';
import { getSession } from '@/utils';
import { LoadingButton } from '@mui/lab';

const AddCard = ({
  open,
  onClose,
  openEditCard,
  // setOpenAddCard,
  // isGetRowValues,
}: any) => {
  // const rowApiValues = {
  //   cardNumber: isGetRowValues?.cell?.row?.original?.name,
  //   expirationDate: isGetRowValues?.cell?.row?.original?.expirationDate,
  //   nameOnCard: '',
  //   CVVCode: '',
  //   companyAccount: '',
  //   seePaymentMethod: '',
  //   sirSales: '',
  //   airService: '',
  //   airOperations: '',
  // };

  // const methods: any = useForm({
  //   resolver: yupResolver(validationSchema),
  //   defaultValues: defaultValues,
  // });

  // const apiMethods: any = useForm({
  //   resolver: yupResolver(validationSchema),
  //   defaultValues: rowApiValues,
  // });

  // const { handleSubmit, reset } = openEditCard === 'Add' ? methods : apiMethods;

  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState('');
  const { user }: any = getSession();
  const [postPaymentCard, { isLoading: PostPaymentCardLoading }] =
    usePostPaymentCardMutation();

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
      enqueueSnackbar('Error creating token', {
        variant: 'error',
      });
      return;
    } else {
      const payload = {
        stripeCustomerId: user?.stripeCustomerId,
        cardToken: token?.id,
        useCompanyAddress: true,
        secureTransaction: true,
        isDefault: true,
      };

      try {
        await postPaymentCard({ body: payload })?.unwrap();
        enqueueSnackbar('Card Added Successful', {
          variant: 'success',
        });
        onClose();
      } catch (error: any) {
        enqueueSnackbar('something went wrong', {
          variant: 'error',
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <DialogTitle sx={{ fontWeight: '700', fontSize: '20px !important' }}>
          {openEditCard === 'Add' ? 'Add a debit or credit Card' : 'Edit Card'}
        </DialogTitle>
        <DialogContent>
          {/* <PaymentForm onSubmit={handleAddCard} /> */}

          <div style={{ marginTop: '10px' }}>
            <label htmlFor="cardholder-name" style={{ fontWeight: '500' }}>
              Cardholder Name
            </label>
            <br />
            <input
              id="cardholder-name"
              type="text"
              placeholder="Enter Card holder Name"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                marginBottom: '15px',
                fontSize: '16px',
                color: '#424770',
                outline: 'none',
              }}
            />
          </div>
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                // border: '1px solid #a9a9a9',
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={PostPaymentCardLoading}
          >
            Add
          </LoadingButton>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>

    // <CommonDrawer
    //   isDrawerOpen={open}
    //   onClose={onClose}
    //   title={`${openEditCard === 'Add'
    //       ? `${openEditCard} a new card`
    //       : `${openEditCard} Card `
    //     }`}
    //   okText={'Save'}
    //   isOk
    //   cancelText={'Cancel'}
    //   footer
    //   submitHandler={handleSubmit(onSubmit)}
    // >
    //   <Box mt={1}>
    //     <FormProvider methods={openEditCard === 'Add' ? methods : apiMethods}>
    //       <Grid container spacing={4}>
    //         <Typography variant="h5" sx={{ padding: '35px 0px 0px 35px' }}>
    //           {openEditCard} a debit or credit card
    //         </Typography>
    //         {dataArray?.map((item: any, index: any) => (
    //           <Grid
    //             item
    //             xs={12}
    //             md={item?.md}
    //             key={uuidv4()}
    //             sx={{ paddingTop: index === 0 ? undefined : '20px !important' }}
    //           >
    //             {item?.componentProps?.heading && (
    //               <Typography variant="h5">
    //                 {item?.componentProps?.heading}
    //               </Typography>
    //             )}
    //             {item?.componentProps?.paragraph && (
    //               <Typography variant="body2">
    //                 {item?.componentProps?.paragraph}
    //               </Typography>
    //             )}
    //             <item.component {...item.componentProps} size={'small'}>
    //               {item?.componentProps?.select &&
    //                 item?.options?.map((option: any) => (
    //                   <option key={option?.value} value={option?.value}>
    //                     {option?.label}
    //                   </option>
    //                 ))}
    //             </item.component>
    //           </Grid>
    //         ))}
    //       </Grid>
    //     </FormProvider>
    //   </Box>
    // </CommonDrawer>
  );
};

export default AddCard;
