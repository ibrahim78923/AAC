import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { Box, MenuItem, Typography } from '@mui/material';
import useCompanyList from './useCompanyList';
import { BackArrIcon } from '@/assets/icons';

const CompanyList = ({ open, onClose }: any) => {
  const { methods } = useCompanyList();

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  const formValues = [
    {
      componentProps: {
        name: 'contactList',
        label: 'Contact List',
        select: true,
      },
      options: [{ label: 'label', value: 'value' }],
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'thirdParty',
        label:
          'This contact list was not purchased, rented, appended, or provided by a third party.',
      },
      component: RHFCheckbox,
    },
  ];

  const accountValues = [
    {
      componentProps: {
        name: 'accounts',
        label: 'Accounts',
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
        label: 'Name',
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
      headerIcon={<BackArrIcon />}
      title="Company List"
      onClose={onClose}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {formValues?.map((form: any) => (
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
        <Typography variant="body2" sx={{ mt: 2, fontWeight: '500' }}>
          Total companies that will be sent
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, fontWeight: '500', mb: 3 }}>
          0
        </Typography>

        {accountValues?.map((form: any) => (
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
        <Box sx={{ mt: 3 }}>
          {audienceName?.map((form: any) => (
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

export default CompanyList;
