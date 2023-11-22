import React from 'react';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { Box, MenuItem } from '@mui/material';
import useSegmentsConditions from './useSegmentsConditions';

const SegmentsConditions = ({}: any) => {
  const { methods } = useSegmentsConditions();

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  const formValues = [
    {
      componentProps: {
        name: 'field',
        label: 'Field',
        select: true,
      },
      options: [{ label: 'label', value: 'value' }],
      component: RHFTextField,
    },
  ];

  const accountValues = [
    {
      componentProps: {
        name: 'operators',
        label: 'Select Operators',
        select: true,
      },
      options: [{ label: 'label', value: 'value' }],
      component: RHFTextField,
    },
  ];
  const audienceName = [
    {
      componentProps: {
        name: 'audience',
        label: '',
        select: true,
      },
      options: [{ label: 'label', value: 'value' }],
      component: RHFTextField,
    },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {formValues.map((form: any) => (
        <form.component
          key={uuidv4()}
          fullWidth
          size="small"
          {...form.componentProps}
        >
          {form?.componentProps?.select
            ? form?.options.map((option: any) => (
                <MenuItem key={option?.value} value={option?.value}>
                  {option?.label}
                </MenuItem>
              ))
            : null}
        </form.component>
      ))}
      <Box sx={{ mt: 2 }}>
        {accountValues.map((form: any) => (
          <form.component
            key={uuidv4()}
            fullWidth
            size="small"
            {...form.componentProps}
          >
            {form?.componentProps?.select
              ? form?.options?.map((option: any) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {option?.label}
                  </MenuItem>
                ))
              : null}
          </form.component>
        ))}
      </Box>
      <Box sx={{ mt: 3 }}>
        {audienceName.map((form: any) => (
          <form.component
            key={uuidv4()}
            fullWidth
            size="small"
            {...form.componentProps}
          >
            {form?.componentProps?.select
              ? form?.options?.map((option: any) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {option?.label}
                  </MenuItem>
                ))
              : null}
          </form.component>
        ))}
      </Box>
    </FormProvider>
  );
};

export default SegmentsConditions;
