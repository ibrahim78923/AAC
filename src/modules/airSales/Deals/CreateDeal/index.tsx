import { useForm } from 'react-hook-form';

import { Grid, MenuItem, Typography, useTheme } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { createDealData } from './CreateDeal.data';
// import useDealSaleSite from '../useDealSaleSite';

import { v4 as uuidv4 } from 'uuid';

import { usePostDealsMutation } from '@/services/airSales/deals';
import dayjs from 'dayjs';

const CreateDeal = ({ open, onClose }: any) => {
  // const { pipelineData } = useDealSaleSite();

  const [postDeals] = usePostDealsMutation();

  const methods = useForm({});
  const theme = useTheme();

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    values.addLineItemId = '6538bb480b3f9e9d83d4a2ce';
    values.closeDate = dayjs(values.closeDate).toISOString();
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
        <Grid container spacing={2} gap={'7px'}>
          {createDealData()?.map((obj) => (
            <Grid item xs={12} key={uuidv4()}>
              <Typography
                sx={{
                  colors: theme?.palette?.grey[600],
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              >
                {/* {obj?.title} */}
              </Typography>
              <obj.component
                fullWidth
                size={'small'}
                SelectProps={{ sx: { borderRadius: '8px' } }}
                {...obj?.componentProps}
              >
                {obj?.componentProps?.select
                  ? obj?.options?.map((option: any) => (
                      <MenuItem key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))
                  : null}
              </obj.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default CreateDeal;
