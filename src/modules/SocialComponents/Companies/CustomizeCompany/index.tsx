import React from 'react';

import {
  Box,
  Grid,
  // Theme,
  // Typography,
  // useTheme,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import ColumnsWrapper from '@/modules/airSales/Deals/DealCustomize/CoumnsWrapper';

import useCustomizeCompany from './useCustomizeCompany';

// import { CustomizeArr } from './CustomizeCompany.data';

import { v4 as uuidv4 } from 'uuid';
// import { AddCircle } from '@mui/icons-material';

const CustomizeCompany = ({ setIsCustomize, isCustomize }: any) => {
  const { methods, columnsData, handleSubmit, onSubmit } =
    useCustomizeCompany();
  // const theme = useTheme<Theme>();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isCustomize}
        onClose={() => {
          setIsCustomize({ ...isCustomize, customizeDrawer: false });
        }}
        title="Customize Columns"
        okText="Save"
        submitHandler={handleSubmit(onSubmit)}
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container>
              {columnsData?.map((col: any) => {
                return (
                  <Grid item lg={12} key={uuidv4()}>
                    <ColumnsWrapper
                      title={col?.slug}
                      checkboxProps={{
                        name: col?.attributes,
                        onChange: () => {},
                        defaultChecked: col?.active,
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </FormProvider>
          {/* commented for future use  */}
          {/* <Typography
            variant="body2"
            sx={{
              color: `${theme?.palette?.slateBlue?.main}`,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              paddingLeft: '8px',
            }}
          >
            <AddCircle /> Add Columns
          </Typography> */}
        </Box>
      </CommonDrawer>
    </>
  );
};

export default CustomizeCompany;
