import React from 'react';

import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import { FilterArray } from './FilterActivityLogs.data';

import { v4 as uuidv4 } from 'uuid';
import { DrawerItemI, DrawerItemOptionI } from './filtercompany.interface';
import useFilterActivityLogs from './useFilterActivityLogs';

const FilterActivityLogs = ({
  isFilter,
  setIsFilter,
  filterValues,
  setFilterValues,
  handleSubmit,
  methods,
  setPage,
}: any) => {
  const { watch, reset } = methods;
  const selectedFiltersValues = watch();

  const {
    onSubmit,
    orgUsersData,
    companyAccounts,
    user,
    organizations,
    role,
    allOrganizationsUsers,
  } = useFilterActivityLogs({
    filterValues,
    setFilterValues,
    setIsFilter,
    selectedFiltersValues,
    setPage,
  });
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isFilter}
        onClose={() => {
          setIsFilter(false);
          reset();
        }}
        title="Filter"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {FilterArray(
                orgUsersData,
                user,
                companyAccounts,
                organizations,
                role,
                selectedFiltersValues,
                allOrganizationsUsers,
              )?.map((item: DrawerItemI) => (
                <Grid item xs={12} md={item?.md} key={item.componentProps.name}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: DrawerItemOptionI) => (
                        <option key={uuidv4()} value={option?.value}>
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

export default FilterActivityLogs;
