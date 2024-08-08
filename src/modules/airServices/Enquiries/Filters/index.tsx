import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import React from 'react';

import { statusOptions } from '../Enquiries.data';
import useFilters from './useFilters';
import { IChildModalState } from '../Enquiries.interface';

export default function Filters({
  isModalOpen,
  onClose,
  setFilter,
}: IChildModalState) {
  const {
    handleSubmit,
    submitEnquiriesFilters,
    resetEnquiriesFilters,
    methods,
  } = useFilters({ setFilter, onClose });

  return (
    <CommonDrawer
      isDrawerOpen={isModalOpen}
      onClose={() => onClose?.()}
      okText={'Apply'}
      title={'Filter'}
      submitHandler={() => handleSubmit(submitEnquiriesFilters)()}
      isOk
      cancelText={'Reset'}
      footer
      cancelBtnHandler={() => resetEnquiriesFilters?.()}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <RHFAutocomplete
              name={'status'}
              label={'Status'}
              placeholder={'Status'}
              options={statusOptions}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
}
