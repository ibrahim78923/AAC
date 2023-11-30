import React from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import { useAddPlanForm } from './useAddPlanForm';

import { isNullOrEmpty } from '@/utils';

import { v4 as uuidv4 } from 'uuid';

import { FormProvider } from '@/components/ReactHookForm';

const AddPlanForm = ({ handleSubmit, methods }: any) => {
  const {
    formDefaultValuesFunction,
    selectProductSuite,
    setSelectProductSuite,
  } = useAddPlanForm();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Grid container spacing={5} sx={{ position: 'relative' }}>
        {formDefaultValuesFunction?.map((item: any) => (
          <Grid item xs={12} md={item?.md} key={uuidv4()}>
            <item.component {...item?.componentProps} size={'small'}>
              {!isNullOrEmpty(item?.componentProps?.select) &&
                item?.options?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
            </item.component>
          </Grid>
        ))}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: '#E5E7EB',

            transform: 'translate(350%, 0%)',

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
            variant={`${selectProductSuite === 'CRM' ? 'contained' : 'text'}`}
            sx={{ height: '25px', borderRadius: '10px' }}
          >
            <Typography>CRM Suite</Typography>
          </Button>
        </Box>
      </Grid>
    </FormProvider>
  );
};

export default AddPlanForm;
