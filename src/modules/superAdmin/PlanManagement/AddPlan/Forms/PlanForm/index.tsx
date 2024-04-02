import React from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';

import { useAddPlanForm } from './useAddPlanForm';

import { isNullOrEmpty } from '@/utils';

import { v4 as uuidv4 } from 'uuid';

import {
  FormProvider,
  RHFMultiSearchableSelect,
  RHFSelect,
} from '@/components/ReactHookForm';
import { selectProductSuites } from './PlanForm.data';

const AddPlanForm = ({
  handleSubmit,
  methods,
  AdditionalStorageValue,
  AdditionalUsereValue,
  crmValue,
  setCrmValue,
  selectProductSuite,
  setSelectProductSuite,
  isSuccess,
  editPlan,
}: any) => {
  const {
    formDefaultValuesFunction,
    productsOptions,
    planLabelRender,
    planNameRender,
    crmOptions,
  } = useAddPlanForm(
    AdditionalStorageValue,
    AdditionalUsereValue,
    selectProductSuite,
    setSelectProductSuite,
  );

  const filter = createFilterOptions<any>();

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
          disabled={isSuccess}
        >
          <Typography>Product</Typography>{' '}
        </Button>
        <Button
          onClick={() => setSelectProductSuite('CRM')}
          variant={`${selectProductSuite === 'CRM' ? 'contained' : 'text'}`}
          sx={{ height: '25px', borderRadius: '10px' }}
          disabled={isSuccess}
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
            // eslint-disable-next-line
            key={index}
            sx={{
              paddingTop: (index === 0 || index === 1) && '0px !important',
            }}
          >
            {selectProductSuite === 'CRM' && index === 0 && !isSuccess && (
              <RHFMultiSearchableSelect
                size="small"
                name={planLabelRender}
                label={planNameRender}
                options={productsOptions}
                required={true}
              />
            )}

            {selectProductSuite === 'CRM' && index === 0 && isSuccess && (
              <>
                <label style={{ marginTop: '20px' }}>Suite</label>
                <TextField
                  value={editPlan?.planProducts?.map((item: any) => item?.name)}
                  disabled={isSuccess}
                  fullWidth
                />
              </>
            )}

            {selectProductSuite === 'product' && index === 0 && (
              <RHFSelect
                name={planLabelRender}
                label={planNameRender}
                size="small"
                disabled={isSuccess}
                required={true}
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
                <>
                  <label style={{ marginTop: '20px' }}>Name</label>
                  <Autocomplete
                    value={crmValue}
                    onChange={(event, newValue) => {
                      if (
                        typeof newValue === 'string' &&
                        !/^\d+$/.test(newValue)
                      ) {
                        setCrmValue({
                          label: newValue?.toLowerCase(),
                        });
                      } else if (
                        newValue &&
                        newValue?.inputValue &&
                        !/^\d+$/.test(newValue?.inputValue)
                      ) {
                        // Create a new value from the user input
                        setCrmValue({
                          label: newValue?.inputValue?.toLowerCase(),
                        });
                      } else {
                        setCrmValue(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      const { inputValue } = params;
                      // Suggest the creation of a new value
                      const isExisting = options?.some(
                        (option) =>
                          inputValue?.toLowerCase() ===
                          option?.label?.toLowerCase(),
                      );
                      if (
                        inputValue !== '' &&
                        !isExisting &&
                        !/^\d+$/.test(inputValue)
                      ) {
                        filtered?.push({
                          inputValue: inputValue?.toLowerCase(),
                          label: `Add "${inputValue}"`,
                        });
                      }

                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={crmOptions}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      if (option?.inputValue) {
                        return option?.inputValue;
                      }
                      return option?.label;
                    }}
                    renderOption={(props, option) => (
                      <li style={{ border: '1px solid lightgray' }} {...props}>
                        {option?.label}
                      </li>
                    )}
                    sx={{ height: 70, marginTop: '5px' }}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="name"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            padding: '2px',
                            borderRadius: '5px',
                          },
                        }}
                      />
                    )}
                  />
                </>
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
