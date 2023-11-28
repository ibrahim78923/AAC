import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { Box, MenuItem, Typography } from '@mui/material';
import { styles } from './ContactList.style';
import useContactList from './useContactList';
import { BackArrowIcon } from '@/assets/icons';

const ContactList = ({ open, onClose }: any) => {
  const { theme, methods } = useContactList();

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
        label: 'Audience Name',
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
      headerIcon={<BackArrowIcon />}
      title="Contact List"
      onClose={onClose}
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
        <Box sx={styles?.smallContactlist(theme)}>
          <Typography sx={styles?.text}>Small Contact List</Typography>
          <Typography sx={styles?.textTwo(theme)}>
            Your contact list may be too small to match enough people for ad
            targeting. Contact list audiences that have at least 1,000 people
            are more likely to have a higher match rate which will be moree
            effective for targeting.
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, fontWeight: '500' }}>
          Contacts that will be sent to the ad network
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, fontWeight: '500', mb: 3 }}>
          0 out of 0
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
        <Typography variant="body3">
          Please refer to the networks contact list requirements.
          <Typography
            variant="body3"
            component={'span'}
            style={{ color: '#38CAB5' }}
          >
            Learn more
          </Typography>
        </Typography>
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

export default ContactList;
