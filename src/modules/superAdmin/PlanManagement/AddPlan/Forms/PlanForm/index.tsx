import React from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  createFilterOptions,
  useTheme,
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
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setFeatureDetails } from '@/redux/slices/planManagement/planManagementSlice';
import { AddPlanFormProps } from '@/modules/superAdmin/PlanManagement/AddPlan/Forms/Forms-interface';
import { indexNumbers, productSuiteName } from '@/constants';
import { IMPORT_ACTION_TYPE } from '@/constants/strings';
import {
  FormDefaultValuesItem,
  Option,
  PlanFormState,
} from './planForm.interface';

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
}: AddPlanFormProps) => {
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
    isSuccess,
  );

  const filter = createFilterOptions<Option>();
  const planForm = useAppSelector(
    (state: PlanFormState) => state?.planManagementForms?.addPlanForm,
  );
  const theme = useTheme();
  const dispatch = useDispatch();

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
          onClick={() => {
            setSelectProductSuite('product');
            dispatch(setFeatureDetails(''));
          }}
          variant={`${selectProductSuite === 'product' ? 'contained' : 'text'}`}
          sx={{ height: '25px', borderRadius: '10px' }}
          disabled={isSuccess}
        >
          <Typography>Product</Typography>{' '}
        </Button>
        <Button
          onClick={() => {
            setSelectProductSuite('CRM');
            dispatch(setFeatureDetails(''));
          }}
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
        {formDefaultValuesFunction?.map(
          (item: FormDefaultValuesItem, index: number) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {selectProductSuite === productSuiteName?.crm &&
                index === indexNumbers?.ZERO &&
                !isSuccess && (
                  <RHFMultiSearchableSelect
                    size="small"
                    name={planLabelRender}
                    label={planNameRender}
                    options={productsOptions}
                    required={true}
                    defaultValues={planForm?.suite}
                  />
                )}

              {selectProductSuite === productSuiteName?.crm &&
                index === indexNumbers?.ZERO &&
                isSuccess && (
                  <>
                    <label style={{ marginTop: '20px' }}>Suite</label>
                    <TextField
                      value={editPlan?.planProducts?.map(
                        (item: { name: string }) => item?.name,
                      )}
                      disabled={isSuccess}
                      fullWidth
                    />
                  </>
                )}

              {selectProductSuite === IMPORT_ACTION_TYPE?.PRODUCT &&
                index === indexNumbers?.ZERO && (
                  <RHFSelect
                    name={planLabelRender}
                    label={planNameRender}
                    size="small"
                    disabled={isSuccess}
                    required={true}
                  >
                    {productsOptions?.map((option: Option) => (
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
                          typeof newValue === productSuiteName?.string &&
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
                        if (typeof option === productSuiteName?.string) {
                          return option;
                        }
                        if (option?.inputValue) {
                          return option?.inputValue;
                        }
                        return option?.label;
                      }}
                      renderOption={(props, option) => {
                        const isAddOption = option?.label?.startsWith('Add');

                        return (
                          <li
                            style={{
                              border: '1px solid lightgray',
                              backgroundColor: isAddOption
                                ? theme?.palette?.primary?.main
                                : theme?.palette?.common?.white,
                              color: isAddOption
                                ? theme?.palette?.common?.white
                                : theme?.palette?.common?.black,
                            }}
                            {...props}
                          >
                            {option?.label}
                          </li>
                        );
                      }}
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
                  item?.options?.map((option: Option) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ),
        )}
      </Grid>
    </FormProvider>
  );
};

export default AddPlanForm;
