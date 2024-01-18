import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
} from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { Box, Grid, Typography } from '@mui/material';
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
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ALL', label: 'All' },
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Published' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'thirdParty',
        label:
          'This contact list was not purchased, rented, appended, or provided by a third party.',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
    {
      componentProps: {
        name: 'accounts',
        label: 'Accounts',
        select: true,
      },
      options: [
        { value: 'ALL', label: 'All' },
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Published' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'audienceName',
        label: 'Audience name',
        select: true,
      },
      options: [
        { value: 'ALL', label: 'All' },
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Published' },
      ],
      component: RHFSelect,
      md: 12,
    },
  ];

  return (
    <CommonDrawer
      isDrawerOpen={open}
      okText="Create Audience"
      isOk
      footer
      headerIcon={
        <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
          <BackArrowIcon />
        </Box>
      }
      title="Contact List"
      onClose={onClose}
      isCancel={false}
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {formValues?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
              {item?.componentProps?.name === 'thirdParty' && (
                <Box my={2}>
                  <Box
                    sx={{
                      borderRadius: '6px',
                      p: '12px',
                      backgroundColor: theme?.palette?.grey[100],
                      my: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ mb: 1 }}
                      color={theme?.palette?.blue?.light}
                    >
                      Small Contact List
                    </Typography>
                    <Typography
                      variant="body3"
                      color={theme?.palette?.blue?.light}
                    >
                      Your contact list may be too small to match enough people
                      for ad targeting. Contact list audiences that have at
                      least 1,000 people are more likely to have a higher match
                      rate which will be more effective for targeting.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ mb: 1 }}
                      color={theme?.palette?.blue?.light}
                    >
                      Contacts that will be sent to the ad network
                    </Typography>
                    <Typography
                      component="span"
                      variant="h5"
                      color={theme?.palette?.blue?.light}
                      fontWeight={500}
                    >
                      0
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color={theme?.palette?.blue?.light}
                      fontWeight={500}
                    >
                      {' '}
                      out of{' '}
                    </Typography>
                    <Typography
                      component="span"
                      variant="h5"
                      color={theme?.palette?.blue?.light}
                      fontWeight={500}
                    >
                      0
                    </Typography>
                  </Box>
                </Box>
              )}
              {item?.componentProps?.name === 'thirdParty' && (
                <Typography variant="body3" color={theme?.palette?.grey[600]}>
                  Please refer to the networks contact list requirements.
                  <Typography
                    variant="body3"
                    component="span"
                    color={theme?.palette?.primary?.main}
                    sx={{ cursor: 'pointer' }}
                  >
                    Learn more
                  </Typography>
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default ContactList;
