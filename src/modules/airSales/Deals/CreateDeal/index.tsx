import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import {
  useGetDealPipeLineQuery,
  usePostDealsMutation,
} from '@/services/airSales/deals';

import {
  createDealData,
  defaultValues,
  validationSchema,
} from './CreateDeal.data';

import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { ASSOCIATIONS_API_PARAMS_FOR, DATE_FORMAT } from '@/constants';
import { useEffect } from 'react';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { usePostAssociationCompaniesMutation } from '@/services/commonFeatures/companies';

const CreateDeal = ({ open, onClose }: any) => {
  const [postDeals, { isLoading: isCreateDealLodaing }] =
    usePostDealsMutation();
  const [postAssociation, { isLoading: createAssociationDealsLoading }] =
    usePostAssociationCompaniesMutation();
  const { data: dealPipelines } = useGetDealPipeLineQuery({ meta: false });

  const defaultPipelineData = dealPipelines?.data?.find(
    (item: any) => item?.isDefault,
  );

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  useEffect(() => {
    setValue('dealPipelineId', defaultPipelineData);
  }, [dealPipelines?.data]);
  const dealPipelineId = watch('dealPipelineId');

  const onSubmit = async (values: any) => {
    const closeDate = values.closeDate
      ? dayjs(values.closeDate).format(DATE_FORMAT?.API)
      : undefined;

    const products =
      values.products?.map((item: string) => ({
        productId: item,
        quantity: 1,
        unitDiscount: 0,
      })) || [];

    values.dealPipelineId = values.dealPipelineId?._id;
    values.ownerId = values.ownerId?._id;
    delete values.products;

    const obj: any = {
      closeDate,
      products,
      ...values,
    };

    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
        delete obj[key];
      }
    });

    try {
      const response = await postDeals({ body: obj })?.unwrap();

      if (response?.data) {
        try {
          const associationPayload = {
            recordId: response?.data?._id,
            recordType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
            operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
          };
          await postAssociation({ body: associationPayload })?.unwrap();
          enqueueSnackbar('Deal created successfully', { variant: 'success' });
        } catch (error: any) {
          const errMsg = error?.data?.message;
          enqueueSnackbar(errMsg ?? 'Error occurred', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      }
    } catch (error) {
      enqueueSnackbar('Error while creating deal', { variant: 'error' });
    }
    reset();
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
      isLoading={isCreateDealLodaing || createAssociationDealsLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {dealDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.options?.map((option: any) => (
                  <option key={option?.value} value={option?.value}>
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
