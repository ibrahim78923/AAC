import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { detailDrawerArray } from './DetailsTicketDrawer.data';
import useDeatilViewDrawerSection from './useDetailViewDrawerSection';

export const DetailTicketsDrawer = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  const { methods, handleSubmit, onSubmit } = useDeatilViewDrawerSection();
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Add Time"
      submitHandler={() => {}}
      footer={true}
      isOk={true}
      okText="Start timer"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {detailDrawerArray?.map((item: any) => (
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
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
