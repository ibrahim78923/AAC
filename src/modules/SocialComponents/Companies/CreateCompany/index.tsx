import React from 'react';

import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import useCreateCompany from './useCreateCompany';

import { dataArray } from './CreateCompany.data';

import { v4 as uuidv4 } from 'uuid';

const CreateCompany = ({ setIsOpenDrawer, isOpenDrawer }: any) => {
  const { methods, handleSubmit, onSubmit, reset } =
    useCreateCompany(setIsOpenDrawer);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer({ ...isOpenDrawer, createCompanyDrawer: false });
          reset();
        }}
        submitHandler={handleSubmit(onSubmit)}
        title="Create Company"
        okText="Add"
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {dataArray()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
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

export default CreateCompany;
