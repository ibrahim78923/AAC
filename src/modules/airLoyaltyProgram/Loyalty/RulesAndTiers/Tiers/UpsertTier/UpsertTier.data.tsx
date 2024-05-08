import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import * as Yup from 'yup';

export const attributesData = [
  {
    id: 1,
    value: 'SELECT_CONTACT',
    label: 'Contact',
    description: 'Select one or multiple contacts',
  },
  {
    id: 2,
    value: 'firstName',
    label: 'First Name',
    description: 'The Contact’s first name',
  },
  {
    id: 3,
    value: 'lastName',
    label: 'Last Name',
    description: 'The contact’s last name',
  },
  {
    id: 4,
    value: 'address',
    label: 'Address',
    description: 'The contact’s address information',
  },
  {
    id: 5,
    value: 'phoneNumber',
    label: 'Telephone number',
    description: 'The contact’s phone number',
  },
  {
    id: 6,
    value: 'AGE',
    label: 'Age',
    description: 'The contact’s age',
  },
  {
    id: 7,
    value: 'LAST_TRANSACTION_DATE',
    label: 'Last transaction date',
    description: 'The date of the contact’s most recent loyalty transaction',
  },
  {
    id: 8,
    value: 'NO_OF_TRANSACTIONS',
    label: 'Number of transactions',
    description: 'The number of loyalty transaction the contact has had',
  },
  {
    id: 9,
    value: 'TOTAL_RECEIVED_CREDITS',
    label: 'Total credits received',
    description:
      'The total number of credits the contact have received to date',
  },
];

export const upsertTierValidationSchema: any = Yup?.object()?.shape({
  tierName: Yup?.string()?.required('Required'),
  tierDescription: Yup?.string()?.required('Required'),
  addLogo: Yup?.mixed()?.nullable(),
  amount: Yup?.string()?.nullable(),
  points: Yup?.number()?.nullable(),
  type: Yup?.string(),
  attributes: Yup?.mixed()?.nullable(),
  operator: Yup?.mixed()?.nullable(),
});

export const upsertTierDefaultValues = {
  tierName: '',
  tierDescription: '',
  addLogo: null,
  amount: '',
  points: null,
  type: '',
  attributes: null,
  operator: null,
};

export const upsertTierDataArray = (termData: any) => {
  if (!termData) {
    return [
      {
        id: 1,
        componentProps: {
          name: 'tierName',
          label: 'Tier Name',
          placeholder: 'Enter name',
          fullWidth: true,
          required: true,
        },
        component: RHFTextField,
      },
      {
        id: 2,
        componentProps: {
          name: 'tierDescription',
          label: 'Tier Description',
          placeholder: 'Enter description',
          fullWidth: true,
          required: true,
        },
        component: RHFTextField,
      },
      {
        id: 3,
        componentProps: {
          name: 'addLogo',
          label: 'Add Logo',
          fileType: 'PNG or JPG',
          fileName: 'Logo',
        },
        component: RHFDropZone,
      },
      {
        id: 4,
        componentProps: {
          variant: 'h5',
        },
        heading: 'Points Calculation',
        component: Typography,
      },
      {
        id: 5,
        componentProps: {
          name: 'amount',
          label: 'Amount',
          fullWidth: true,
          options: ['1'],
          placeholder: 'Select',
        },
        component: RHFAutocomplete,
      },
      {
        id: 6,
        componentProps: {
          borderLeft: '2px solid',
          borderColor: 'grey.700',
          ml: 2,
          my: -2,
          pl: 1,
          py: 2,
          color: 'grey.900',
        },
        heading: 'Currency equivalents to',
        component: Typography,
      },
      {
        id: 7,
        componentProps: {
          name: 'points',
          label: 'Points',
          placeholder: 'Enter',
          type: 'number',
          fullWidth: true,
        },
        component: RHFTextField,
      },
    ];
  } else {
    return [
      {
        id: 8,
        componentProps: {
          name: 'type',
          label: 'Type',
          placeholder: 'Contact',
          disabled: true,
          fullWidth: true,
        },
        component: RHFTextField,
      },
      {
        id: 9,
        componentProps: {
          name: 'attributes',
          label: 'Attributes',
          placeholder: 'Select',
          fullWidth: true,
          options: attributesData,
          getOptionLabel: (option: any) => option?.label,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option?.id === newValue?.id,
          renderOption: (props: any, option: any) => {
            return (
              <li {...props} key={option?.id}>
                <Box key={option?.id} width={'100%'}>
                  <Typography
                    variant={'body2'}
                    color={'grey.600'}
                    fontWeight={500}
                  >
                    {option?.label}
                  </Typography>
                  <Typography
                    variant={'body3'}
                    color={'grey.600'}
                    fontWeight={400}
                  >
                    {option?.description}
                  </Typography>
                </Box>
              </li>
            );
          },
        },
        component: RHFAutocomplete,
      },
      {
        id: 10,
        componentProps: {
          name: 'operator',
          label: 'Operator',
          placeholder: 'Contact',
          disabled: true,
          fullWidth: true,
        },
        component: RHFTextField,
      },
    ];
  }
};
