import React from 'react';
import { Grid } from '@mui/material';
import { getButtonData } from './CtaEditorDrawer.data';

const StepCustomizedButton = ({ buttonType }: any) => {
  const formFields = getButtonData(buttonType);
  return (
    <>
      {formFields?.map((item: any) => (
        <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
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
    </>
  );
};

export default StepCustomizedButton;
