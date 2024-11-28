import React, { createElement } from 'react';

import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import useCreateCompany from './useCreateCompany';

import { dataArray } from './CreateCompany.data';

import { v4 as uuidv4 } from 'uuid';
import { DrawerItemI, DrawerItemOptionI } from './createcompany.interface';
import { componentMap } from '@/utils/dynamic-forms';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';

const CreateCompany = ({ setIsOpenDrawer, isOpenDrawer }: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    reset,
    getCompanyContactsList,
    form,
    getDynamicFieldsStatus,
    postIsLoading,
  } = useCreateCompany(setIsOpenDrawer);

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
        isLoading={postIsLoading}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          {getDynamicFieldsStatus?.isLoading ||
          getDynamicFieldsStatus?.isFetching ? (
            <SkeletonForm />
          ) : getDynamicFieldsStatus?.isError ? (
            <ApiErrorState />
          ) : (
            <FormProvider methods={methods}>
              <Grid container spacing={1}>
                {dataArray(getCompanyContactsList)?.map((item: DrawerItemI) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.componentProps?.name}
                  >
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
                {form?.map((item: any) => (
                  <Grid item xs={12} key={item?.id}>
                    {componentMap[item?.component] &&
                      createElement(componentMap[item?.component], {
                        ...item?.componentProps,
                        name: item?.componentProps?.label,
                        size: 'small',
                      })}
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          )}
        </Box>
      </CommonDrawer>
    </>
  );
};

export default CreateCompany;
