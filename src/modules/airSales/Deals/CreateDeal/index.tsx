import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { usePostDealsMutation } from '@/services/airSales/deals';

import { createDealData } from './CreateDeal.data';
import { v4 as uuidv4 } from 'uuid';

import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const CreateDeal = ({ open, onClose }: any) => {
  const [postDeals] = usePostDealsMutation();
  const startDate = 0;

  const methods = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    values.addLineItemId = '6538bb480b3f9e9d83d4a2ce'; // need get api for addLineItem but missing this api so i am using static id
    values.closeDate = dayjs(values?.closeDate[startDate])?.format(
      DATE_FORMAT?.API,
    );
    try {
      await postDeals({ body: values })?.unwrap();
    } catch (error) {}
    onClose();
  };

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
          {createDealData()?.map((item: any) => (
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
