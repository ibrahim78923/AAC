import { useState } from 'react';

import { Grid, Box, Button, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import {
  assignPlanData,
  defaultValues,
  validationSchema,
} from './EditForm.data';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

export default function EditForm({
  isOpenDrawer,
  onClose,
  initialValueProps = defaultValues,
}: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues: initialValueProps,
  });

  const [selectProductSuite, setSelectProductSuite] = useState('product');

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Assign Plan'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4} sx={{ position: 'relative' }}>
            {assignPlanData(selectProductSuite)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
            <Box
              sx={{
                position: 'absolute',
                top: 90,
                right: 0,
                background: '#E5E7EB',
                borderRadius: '10px',
              }}
            >
              <Button
                onClick={() => setSelectProductSuite('product')}
                variant={`${
                  selectProductSuite === 'product' ? 'contained' : 'text'
                }`}
                sx={{ height: '25px', borderRadius: '10px' }}
              >
                <Typography>Product</Typography>{' '}
              </Button>
              <Button
                onClick={() => setSelectProductSuite('CRM')}
                variant={`${
                  selectProductSuite === 'CRM' ? 'contained' : 'text'
                }`}
                sx={{ height: '25px', borderRadius: '10px' }}
              >
                <Typography>CRM Suite</Typography>
              </Button>
            </Box>
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
