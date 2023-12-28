import React from 'react';

import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import useFilterCompany from './useFilterCompany';

import { FilterArray } from './FilterCompany.data';

import { v4 as uuidv4 } from 'uuid';

const FilterCompany = ({
  isFilter,
  setIsFilter,
  filterValues,
  setFilterValues,
}: any) => {
  const { methods, handleSubmit, onSubmit } = useFilterCompany({
    filterValues,
    setFilterValues,
    setIsFilter,
  });
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isFilter}
        onClose={() => {
          setIsFilter(false);
        }}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {FilterArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={uuidv4()}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default FilterCompany;
