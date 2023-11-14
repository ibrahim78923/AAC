import React from 'react';

import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import useCreateViewCompany from './useCreateViewCompany';

import { FormProvider } from '@/components/ReactHookForm';
import { viewCompanyArr } from './CreateViewCompany.data';

import { v4 as uuidv4 } from 'uuid';

const CreateViewCompany = (props: any) => {
  const { isCreateView, setIsCreateView } = props;
  const { methods } = useCreateViewCompany();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isCreateView}
        onClose={() => {
          setIsCreateView(false);
        }}
        title="Create View"
        okText="Save"
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {viewCompanyArr?.map((item: any) => (
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

export default CreateViewCompany;
