import React from 'react';

import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import ColumnsWrapper from '@/modules/airSales/Deals/DealCustomize/CoumnsWrapper';

import useCustomizeCompany from './useCustomizeCompany';

import { CustomizeArr } from './CustomizeCompany.data';

import { v4 as uuidv4 } from 'uuid';

const CustomizeCompany = ({ setIsCustomize, isCustomize }: any) => {
  const { methods } = useCustomizeCompany();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isCustomize}
        onClose={() => {
          setIsCustomize(false);
        }}
        title="Filter"
        okText="Save"
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container>
              {CustomizeArr?.map((item) => {
                return (
                  <Grid item lg={12} key={uuidv4()}>
                    <ColumnsWrapper
                      title={item?.title}
                      checkboxProps={{
                        onChange: () => {},
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default CustomizeCompany;
