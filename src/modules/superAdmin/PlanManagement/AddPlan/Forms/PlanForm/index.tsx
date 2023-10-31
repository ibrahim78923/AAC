import React from 'react';

import { Grid } from '@mui/material';

import { useAddPlanForm } from './useAddPlanForm';

import { isNullOrEmpty } from '@/utils';

import { v4 as uuidv4 } from 'uuid';

const AddPlanForm = () => {
  const { formDefaultValuesFunction } = useAddPlanForm();

  return (
    <Grid container spacing={5}>
      {formDefaultValuesFunction?.map((item: any) => (
        <Grid item xs={12} md={item?.md} key={uuidv4()}>
          <item.component {...item.componentProps} size={'small'}>
            {!isNullOrEmpty(item?.componentProps?.select) &&
              item?.options?.map((option: any) => (
                <option key={uuidv4()} value={option?.value}>
                  {option?.label}
                </option>
              ))}
          </item.component>
        </Grid>
      ))}
    </Grid>
  );
};

export default AddPlanForm;
