import React from 'react';

import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

import useProductEditorDrawer from './useProductEditorDrawer';

import { v4 as uuidv4 } from 'uuid';
import {
  drawerButtonTitle,
  drawerTitle,
  productsDataArray,
} from './ProductEditorDrawer.data';
import Search from '@/components/Search';

const ProductEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsProducts,
    watchProductstatus,
    searchProduct,
    setSearchProduct,
  } = useProductEditorDrawer();

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
            methods={methodsProducts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <RHFRadioGroup
                  options={['Custom Line Item', 'Existing Products']}
                  name={'productStatus'}
                  label={''}
                />
              </Grid>
              {watchProductstatus[0] === 'Custom Line Item' ? (
                productsDataArray?.map((item: any) => (
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
                    label="Search Products"
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

export default ProductEditorDrawer;
