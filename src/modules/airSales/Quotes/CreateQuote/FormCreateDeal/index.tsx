import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { usePostDealsMutation } from '@/services/airSales/deals';

import {
  createDealData,
  defaultValues,
  validationSchema,
} from './FormCreateDeal.data';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { DATE_FORMAT } from '@/constants';

const CreateDeal = ({ open, onClose, refetchDealsDropdown }: any) => {
  const [postDeals, { isLoading: isCreateDealLodaing }] =
    usePostDealsMutation();
  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const dealPipelineId = watch('dealPipelineId');

  const onSubmit = async (values: any) => {
    const closeDate = dayjs(values?.closeDate)?.format(DATE_FORMAT?.API);
    const products = values?.products?.map((id: string) => ({
      productId: id,
      quantity: 1,
      unitDiscount: 0,
    }));
    delete values.products;
    const obj = {
      closeDate,
      products,
      ...values,
    };

    try {
      await postDeals({ body: obj })?.unwrap();
      enqueueSnackbar('Deal created successfully', {
        variant: 'success',
      });
      reset();
      refetchDealsDropdown();
    } catch (error) {
      enqueueSnackbar('Error while creating deal', {
        variant: 'error',
      });
    }
    onClose();
  };

  const dealDataArray = createDealData({ dealPipelineId });

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Create Deal"
      footer
      okText="Create"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      isLoading={isCreateDealLodaing}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {dealDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default CreateDeal;
