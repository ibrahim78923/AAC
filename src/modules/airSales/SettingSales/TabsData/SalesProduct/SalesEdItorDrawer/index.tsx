import React from 'react';
import { Box, Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { dataArray } from './SalesEditorDrawer.data';

import useSalesEditorDrawer from './useSalesEditorDrawer';

import { v4 as uuidv4 } from 'uuid';

const SalesEditorDrawer = ({
  isDraweropen,
  isEditMode,
  handleCloseDrawer,
  selectedCheckboxes,
}: any) => {
  const { handleSubmit, onSubmit, salesProduct } = useSalesEditorDrawer({
    selectedCheckboxes,
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
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={salesProduct}>
            <Grid container spacing={2}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
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
        </Box>
      </CommonDrawer>
    </>
  );
};

export default SalesEditorDrawer;
