import React from 'react';
import { Grid } from '@mui/material';
import { createQuoteFormFields } from '../CreateQuote.data';
import TemplateFrame from '../TemplateFrame';
import TemplateBasic from '../TemplateBasic';
import TemplatePlaceholder from '../TemplatePlaceholder';

const StepDetails = ({ values }: any) => {
  return (
    <Grid container spacing={'40px'}>
      <Grid item xs={5}>
        <Grid container spacing={'20px'}>
          {createQuoteFormFields?.map((item: any, index) => {
            if (index === 0) {
              return null;
            } else if (index >= 1 && index <= 5) {
              return (
                <Grid item xs={12} key={item.id}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <TemplateFrame>
          {values?.quoteTemplate === '' || values?.quoteTemplate == null ? (
            <TemplatePlaceholder />
          ) : (
            <TemplateBasic />
          )}
        </TemplateFrame>
      </Grid>
    </Grid>
  );
};

export default StepDetails;
