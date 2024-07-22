import React from 'react';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { goalDetailsTemplateArray } from './Describe.data';
import TemplateFrame from './TemplateFrame';
import TemplatePlaceholder from './TemplatePlaceholder';

const Describe = (props: any) => {
  const { methods, handleSubmit } = props;

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item md={6} xs={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {goalDetailsTemplateArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Grid>

      <Grid item md={6} xs={12}>
        <TemplateFrame>
          {/* {values[0] === '' || values[0] == null ? (
              <TemplatePlaceholder />
            ) : values[0] === 'call' ? (
              <TemplateBasic />
            ) : (
              <TemplateBasic />
            )} */}
          <TemplatePlaceholder />
        </TemplateFrame>
      </Grid>
    </Grid>
  );
};

export default Describe;
