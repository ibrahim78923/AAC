import React, { createElement } from 'react';
import { Box, CircularProgress, Grid, Skeleton } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { dataArray } from './SalesEditorDrawer.data';
import useSalesEditorDrawer from './useSalesEditorDrawer';
import { SalesEditorDrawerProps } from '../Salesproduct.interface';
import { componentMap } from '@/utils/dynamic-forms';
import { AttachFileCard } from '@/components/Avatars/AttachFileCard';

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
    form,
    isLoading,
    productsById,
  } = useSalesEditorDrawer({
    selectedCheckboxes,
    isEditMode,
    setIsDraweropen,
    setSelectedCheckboxes,
  });

  const imageParams = {
    orignalName: productsById?.data?.image?.url,
    fileUrl: productsById?.data?.image?.url,
    fileSize: productsById?.data?.image?.size,
  };
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
          <FormProvider FormProvider methods={salesProduct}>
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
                    <>
                      <item.component {...item.componentProps} size={'small'}>
                        {item?.componentProps?.select &&
                          item?.options?.map((option: any) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                      </item.component>
                      {item.componentProps?.name === 'image' && isEditMode && (
                        <Box sx={{ my: 2 }}>
                          <AttachFileCard
                            data={imageParams}
                            onDelete={() => {}}
                            permissionKey={[]}
                          />
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
              ))}
              {isLoading ? (
                <Box display="flex" justifyContent="center" mt={3} width="100%">
                  <CircularProgress />
                </Box>
              ) : (
                form?.map((item: any) => (
                  <Grid item xs={12} key={item?.id}>
                    {componentMap[item?.component] &&
                      createElement(componentMap[item?.component], {
                        ...item?.componentProps,
                        name: item?.componentProps?.label,
                        size: 'small',
                      })}
                  </Grid>
                ))
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default SalesEditorDrawer;
