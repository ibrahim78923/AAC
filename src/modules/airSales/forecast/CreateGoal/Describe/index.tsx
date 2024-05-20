import React from 'react';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import {
  goalDetailsArray,
  goalDetailsDefaultValues,
  goalDetailsTemplateArray,
  goalDetailsValidationSchema,
} from './Describe.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TemplateFrame from './TemplateFrame';
import TemplatePlaceholder from './TemplatePlaceholder';
import TemplateBasic from './TemplateBasic';

const Describe = (props: any) => {
  const { createScratch } = props;

  const methods: any = useForm({
    resolver: yupResolver(goalDetailsValidationSchema),
    defaultValues: goalDetailsDefaultValues,
  });

  const { handleSubmit, watch } = methods;
  const values = watch(['object']);

  const onSubmit = async () => {};

  return (
    <Grid container xs={12} spacing={2}>
      {createScratch ? (
        <Grid item md={6} xs={12}>
          <FormProvider methods={methods} handleSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              {goalDetailsArray?.map((item: any) => (
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
      ) : (
        <Grid item md={6} xs={12}>
          <FormProvider methods={methods} handleSubmit={handleSubmit(onSubmit)}>
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
      )}
      {!createScratch && (
        <Grid item md={6} xs={12}>
          <TemplateFrame>
            {values[0] === '' || values[0] == null ? (
              <TemplatePlaceholder />
            ) : values[0] === 'call' ? (
              <TemplateBasic />
            ) : (
              <TemplateBasic />
            )}
          </TemplateFrame>
        </Grid>
      )}
    </Grid>
  );
};

export default Describe;
