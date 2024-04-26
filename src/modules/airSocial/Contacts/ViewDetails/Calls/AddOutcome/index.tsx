import { FormProvider } from '@/components/ReactHookForm';
import { ScheduleModals } from '@/components/ScheduleModals';
import { Grid } from '@mui/material';
import React from 'react';
import { outcomesDataArray } from './AddOutcome.data';

const AddOutcome = ({
  openModal,
  handleClose,
  methods,
  handleSubmit,
  loading,
}: any) => {
  return (
    <ScheduleModals
      submitButonText="Update"
      type={'outcome'}
      open={openModal}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isFooter={true}
      loading={loading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={'22px'}>
          {outcomesDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'}>
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
    </ScheduleModals>
  );
};

export default AddOutcome;
