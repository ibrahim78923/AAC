import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/material';
import { CTAImageDataArray } from './CtaEditorDrawer.data';

const StepImageButton = () => {
  return (
    <>
      {CTAImageDataArray?.map((item: any) => (
        <Grid item xs={12} md={item?.md} key={uuidv4()}>
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

export default StepImageButton;
