import { Grid, Box, Typography } from '@mui/material';

import { dataArray, defaultValues, validationSchema } from './AddCard.data';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

const AddCard = ({
  open,
  onClose,
  openEditCard,
  setOpenAddCard,
  isGetRowValues,
}: any) => {
  const rowApiValues = {
    cardNumber: isGetRowValues?.cell?.row?.original?.name,
    expirationDate: isGetRowValues?.cell?.row?.original?.expirationDate,
    nameOnCard: '',
    CVVCode: '',
    companyAccount: '',
    seePaymentMethod: '',
    sirSales: '',
    airService: '',
    airOperations: '',
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const apiMethods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: rowApiValues,
  });

  const { handleSubmit, reset } = openEditCard === 'Add' ? methods : apiMethods;

  const onSubmit = async () => {
    reset();
    setOpenAddCard(false);
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
  };

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title={`${
        openEditCard === 'Add'
          ? `${openEditCard} a new card`
          : `${openEditCard} Card `
      }`}
      okText={'Save'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={openEditCard === 'Add' ? methods : apiMethods}>
          <Grid container spacing={4}>
            <Typography variant="h5" sx={{ padding: '35px 0px 0px 35px' }}>
              {openEditCard} a debit or credit card
            </Typography>
            {dataArray?.map((item: any, index: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                sx={{ paddingTop: index === 0 ? undefined : '20px !important' }}
              >
                {item?.componentProps?.heading && (
                  <Typography variant="h5">
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                {item?.componentProps?.paragraph && (
                  <Typography variant="body2">
                    {item?.componentProps?.paragraph}
                  </Typography>
                )}
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddCard;
