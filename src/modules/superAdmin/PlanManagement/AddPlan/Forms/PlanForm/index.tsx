import React from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import { useAddPlanForm } from './useAddPlanForm';

import { isNullOrEmpty } from '@/utils';

import { v4 as uuidv4 } from 'uuid';

import {
  FormProvider,
  RHFMultiSearchableSelect,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { selectProductSuites } from './PlanForm.data';

const AddPlanForm = ({
  handleSubmit,
  methods,
  AdditionalStorageValue,
}: any) => {
  const {
    formDefaultValuesFunction,
    selectProductSuite,
    setSelectProductSuite,
    productsOptions,
    planLabelRender,
    planNameRender,
  } = useAddPlanForm(AdditionalStorageValue);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <Box
        sx={{
          width: 'fit-content',
          margin: 'auto',
          background: '#E5E7EB',
          borderRadius: '10px',
        }}
      >
        <Button
          onClick={() => setSelectProductSuite('product')}
          variant={`${selectProductSuite === 'product' ? 'contained' : 'text'}`}
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
      <Grid
        container
        spacing={5}
        sx={{ position: 'relative', marginTop: '30px' }}
      >
        {formDefaultValuesFunction?.map((item: any, index: any) => (
          <Grid
            item
            xs={12}
            md={item?.md}
            key={uuidv4()}
            sx={{
              paddingTop: (index === 0 || index === 1) && '0px !important',
            }}
          >
            {selectProductSuite === 'CRM' && index === 0 && (
              <RHFMultiSearchableSelect
                size="small"
                name={planLabelRender}
                label={planNameRender}
                options={productsOptions}
              />
            )}

            {selectProductSuite === 'product' && index === 0 && (
              <RHFSelect
                name={planLabelRender}
                label={planNameRender}
                size="small"
              >
                {productsOptions?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </RHFSelect>
            )}

            {item?.componentProps.name == selectProductSuites?.planTypeId &&
              selectProductSuite === selectProductSuites?.crm && (
                <RHFTextField
                  name="name"
                  label="Name"
                  size="small"
                  placeholder="Enter Name"
                  required={true}
                />
              )}
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
      </Grid>
    </FormProvider>
  );
};

export default AddPlanForm;
