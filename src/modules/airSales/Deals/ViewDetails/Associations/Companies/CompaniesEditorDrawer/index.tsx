import React from 'react';

import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

import {
  companiesDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './CompaniesEditorDrawer.data';
import useCompaniesEditorDrawer from './useCompaniesEditorDrawer';
import Search from '@/components/Search';

const CompaniesEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsCompanies,
    searchProduct,
    setSearchProduct,
    watchProducts,
  } = useCompaniesEditorDrawer();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsCompanies}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <RHFRadioGroup
                  options={['New Company', 'Existing Company']}
                  name={'companieStatus'}
                  label={false}
                />
              </Grid>
              {watchProducts[0] === 'New Company' ? (
                companiesDataArray?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
                ))
              ) : (
                <Grid item xs={12}>
                  <Search
                    searchBy={searchProduct}
                    setSearchBy={setSearchProduct}
                    label="Search Companies"
                    size="medium"
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default CompaniesEditorDrawer;
