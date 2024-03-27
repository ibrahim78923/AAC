import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { usePostDealsMutation } from '@/services/airSales/deals';

import {
  createDealData,
  defaultValues,
  validationSchema,
} from './CreateDeal.data';
import { v4 as uuidv4 } from 'uuid';

import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateDeal = ({ open, onClose }: any) => {
  const [postDeals] = usePostDealsMutation();
  // const startDate = 0;

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const dealPiplineId = watch('dealPiplineId');

  const onSubmit = async (values: any) => {
    const [closeDate] = values?.closeDate;
    values.closeDate = dayjs(closeDate)?.toISOString();
    try {
      await postDeals({ body: values })?.unwrap();
      reset();
    } catch (error) {}
    onClose();
  };

  const dealDataArray = createDealData({ dealPiplineId });

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Create Deal"
      footer
      okText="Create"
      isOk
      submitHandler={handleSubmit(onSubmit)}
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
