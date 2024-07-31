import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { FilterPropsI } from './interface';
import { filtersDataArray } from './data';
import { useLazyGetAllDropdownProductsQuery } from '@/services/common-APIs';
import { useLazyGetUserDropdownListQuery } from '@/services/superAdmin/settings/faqs';

const FilterDrawer = ({
  open,
  onClose,
  onSubmit,
  formMethods,
  isLoading,
}: FilterPropsI) => {
  const createdByUsers = useLazyGetUserDropdownListQuery();
  const products = useLazyGetAllDropdownProductsQuery();
  const formFieldsArray = filtersDataArray(products, createdByUsers);

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Filters"
      okText="Apply"
      isOk={true}
      footer={true}
      submitHandler={onSubmit}
      isLoading={isLoading}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={'22px'}>
          {formFieldsArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default FilterDrawer;
