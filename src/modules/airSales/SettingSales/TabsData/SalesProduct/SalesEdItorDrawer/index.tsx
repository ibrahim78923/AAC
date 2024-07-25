import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { dataArray } from './SalesEditorDrawer.data';
import useSalesEditorDrawer from './useSalesEditorDrawer';
import { SalesEditorDrawerProps } from '../Salesproduct.interface';

const SalesEditorDrawer = ({
  isDraweropen,
  isEditMode,
  handleCloseDrawer,
  setIsDraweropen,
  setSelectedCheckboxes,
  selectedCheckboxes,
}: SalesEditorDrawerProps) => {
  const {
    handleSubmit,
    onSubmit,
    salesProduct,
    productLoading,
    updateProductLoading,
    productsDataLoading,
  } = useSalesEditorDrawer({
    selectedCheckboxes,
    isEditMode,
    setIsDraweropen,
    setSelectedCheckboxes,
  });
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={isEditMode ? 'Edit Product' : 'Create Product'}
        okText={isEditMode ? 'Update' : 'Add'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
        isLoading={isEditMode ? updateProductLoading : productLoading}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={salesProduct}>
            <Grid container spacing={1}>
              {dataArray()?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  {productsDataLoading ? (
                    <Skeleton
                      height={46}
                      variant="rectangular"
                      animation="wave"
                    />
                  ) : (
                    <item.component {...item.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                  )}
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default SalesEditorDrawer;
