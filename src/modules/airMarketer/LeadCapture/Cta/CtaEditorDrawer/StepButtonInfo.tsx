import React from 'react';
import { Grid } from '@mui/material';
import { buttonInfoData } from './CtaEditorDrawer.data';

const StepButtonInfo = () => {
  return (
    <>
      {buttonInfoData?.map((item: any) => (
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

export default StepButtonInfo;
