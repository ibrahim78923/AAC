import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { Box, MenuItem } from '@mui/material';
import useLookalike from './useLookalike';
import { ViewDetailBackArrowIcon } from '@/assets/icons';

const Lookalike = ({ open, onClose }: any) => {
  const { methods } = useLookalike();

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  const formValues = [
    {
      componentProps: {
        name: 'contactList',
        label: 'Contact List',
        select: true,
        disabled: true,
      },
      options: [{ label: 'label', value: 'value' }],
      component: RHFTextField,
    },
  ];

  const accountValues = [
    {
      componentProps: {
        name: 'accounts',
        label: 'Ad accounts',
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
        label: 'Audience name',
        select: true,
      },
      options: [{ label: 'label', value: 'value' }],
      component: RHFTextField,
    },
  ];

  return (
    <CommonDrawer
      isDrawerOpen={open}
      okText="Create Audience"
      isOk
      footer
      onClose={onClose}
      title="Lookalike"
      headerIcon={<ViewDetailBackArrowIcon />}
    >
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
        <Box sx={{ marginTop: '20px' }}>
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
    </CommonDrawer>
  );
};

export default Lookalike;
