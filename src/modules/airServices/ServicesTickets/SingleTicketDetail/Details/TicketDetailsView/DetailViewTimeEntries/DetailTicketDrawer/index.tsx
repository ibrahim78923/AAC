import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';

import React from 'react';

import { useDetailTicketDrawer } from './useDetailTicketDrawer';

export const DetailTicketDrawer = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    isDrawerOpen,
    setIsDrawerOpen,
    booleanVar,
    isLoading,
  } = useDetailTicketDrawer(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Add Time"
      submitHandler={handleSubmit(onSubmit)}
      footer={true}
      isOk={true}
      okText={booleanVar === true ? 'submit' : 'Start timer'}
      isLoading={isLoading}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {ticketDetailsFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={item?.id} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
