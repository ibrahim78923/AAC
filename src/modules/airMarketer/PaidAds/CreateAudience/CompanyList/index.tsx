import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
} from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import useCompanyList from './useCompanyList';
import { BackArrowIcon } from '@/assets/icons';

const CompanyList = ({ open, onClose }: any) => {
  const theme = useTheme();
  const { methods } = useCompanyList();

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
        name: 'name',
        label: 'Name',
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
      title="Company List"
      onClose={onClose}
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
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default CompanyList;
