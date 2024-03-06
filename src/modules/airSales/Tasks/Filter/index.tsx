// import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { setFiltersData } from '@/redux/slices/taskManagement/taskManagementSlice';
import CommonDrawer from '@/components/CommonDrawer';
import {
  filterData,
  filterDefaultValues,
  filterValidationSchema,
} from '../Task.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/redux/store';
import { v4 as uuidv4 } from 'uuid';

const Filter = ({ isFilterDrawerOpen, setIsFilterDrawerOpen }: any) => {
  const dispatch: any = useAppDispatch();
  const methods: any = useForm({
    resolver: yupResolver(filterValidationSchema),
    defaultValues: filterDefaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (values: any) => {
    dispatch(setFiltersData(values));
  };

  return (
    <CommonDrawer
      isDrawerOpen={isFilterDrawerOpen}
      onClose={() => setIsFilterDrawerOpen(false)}
      title={'Filter'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer={true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {filterData?.map((item: any, index: any) => (
            <Grid
              item
              xs={12}
              md={item?.md}
              key={uuidv4()}
              sx={{
                paddingTop: index === 0 ? '40px !important' : '17px !important',
              }}
            >
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
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

export default Filter;
