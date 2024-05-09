import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
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

export const namesOperator = [
  { value: 'equals', label: 'Equal' },
  { value: 'not equals', label: 'Not Equal' },
  { value: 'is known', label: 'Known' },
  { value: 'is unknown', label: 'Unknown' },
];
export const dateOperator = [
  { value: 'equals', label: 'Equal' },
  { value: 'not equals', label: 'Not Equal' },
  { value: 'contains', label: 'Contains' },
  { value: 'is known', label: 'Known' },
  { value: 'is unknown', label: 'Unknown' },
];
export const ageOperator = [
  { value: 'equals', label: 'Equal' },
  { value: 'not equals', label: 'Not Equal' },
  { value: 'greater than', label: 'Greater Than' },
  { value: 'less than', label: 'Less Than' },
  { value: 'is known', label: 'Known' },
  { value: 'is unknown', label: 'Unknown' },
];
export const lastTransactionOperator = [
  { value: 'equals', label: 'Equal' },
  { value: 'not equals', label: 'Not Equal' },
  { value: 'before', label: 'Before' },
  { value: 'after', label: 'After' },
  { value: 'is known', label: 'Known' },
  { value: 'is unknown', label: 'Unknown' },
];

export const upsertTierValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
  description: Yup?.string()?.required('Required'),
  logo: Yup?.mixed()?.nullable(),
  amount: Yup?.string()?.nullable()?.required('Required'),
  points: Yup?.number()?.nullable()?.required('Required'),
  type: Yup?.string(),
  contacts: Yup?.mixed()?.nullable(),
  attribute: Yup?.mixed()?.nullable(),
  operator: Yup?.mixed()?.nullable(),
  fieldValue: Yup?.string(),
});

export const upsertTierDefaultValues = {
  name: '',
  description: '',
  logo: null,
  amount: '',
  points: null,
  type: 'CONTACTS',
  attribute: null,
  operator: null,
  fieldValue: {},
  contacts: [],
};

export const constantsValues = {
  SELECT_CONTACT: 'Contact',
  firstName: 'First Name',
  lastName: 'Last Name',
  address: 'Address',
  phoneNumber: 'Telephone number',
  AGE: 'Age',
  LAST_TRANSACTION_DATE: 'Last transaction date',
  NO_OF_TRANSACTIONS: 'Number of transactions',
  TOTAL_RECEIVED_CREDITS: 'Total credits received',
};

export const operatorsConstantsValues = {
  equals: 'Equal',
  notEquals: 'Not Equal',
  isKnown: 'Known',
  isUnknown: 'Unknown',
  contains: 'Contains',
  greaterThan: 'Greater Than',
  lessThan: 'Less Than',
  before: 'Before',
  after: 'After',
};

export const upsertTierDataArray = ({
  termData,
  watch,
  apiContactQuery,
}: any) => {
  const attributesValues = watch('attribute');
  const selectedAttributesValues = attributesValues?.label;

  const operatorsValues = watch('operator');
  const selectedOperatorsValue = operatorsValues?.label;

  let componentPropsContact: any = {};
  let componentContact: any = Box;

  if (selectedAttributesValues === constantsValues?.SELECT_CONTACT) {
    componentContact = RHFAutocompleteAsync;
    componentPropsContact = {
      placeholder: 'select',
      multiple: true,
      apiQuery: apiContactQuery,
      externalParams: { limit: 50 },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    };
  } else {
    componentContact = Box;
  }
  let componentProps: any = {};
  let component: any = Box;

  if (
    [constantsValues?.firstName, constantsValues?.lastName]?.includes(
      selectedAttributesValues,
    )
  ) {
    component = RHFAutocomplete;
    componentProps = {
      placeholder: 'select',
      options: namesOperator,
      getOptionLabel: (option: any) => option?.label,
    };
  } else if (
    [constantsValues?.address, constantsValues?.phoneNumber]?.includes(
      selectedAttributesValues,
    )
  ) {
    component = RHFAutocomplete;
    componentProps = {
      placeholder: 'select',
      options: dateOperator,
      getOptionLabel: (option: any) => option?.label,
    };
  } else if (
    [
      constantsValues?.AGE,
      constantsValues?.NO_OF_TRANSACTIONS,
      constantsValues?.TOTAL_RECEIVED_CREDITS,
    ]?.includes(selectedAttributesValues)
  ) {
    component = RHFAutocomplete;
    componentProps = {
      placeholder: 'select',
      options: ageOperator,
      getOptionLabel: (option: any) => option?.label,
    };
  } else if (
    [constantsValues?.LAST_TRANSACTION_DATE]?.includes(selectedAttributesValues)
  ) {
    component = RHFAutocomplete;
    componentProps = {
      placeholder: 'select',
      options: lastTransactionOperator,
      getOptionLabel: (option: any) => option?.label,
    };
  } else {
    component = Box;
  }
  let componentPropsTwo: any = {};
  let componentTwo: any = Box;
  if (
    [
      operatorsConstantsValues?.after,
      operatorsConstantsValues?.before,
      operatorsConstantsValues?.contains,
      operatorsConstantsValues?.equals,
      operatorsConstantsValues?.greaterThan,
      operatorsConstantsValues?.lessThan,
      operatorsConstantsValues?.notEquals,
    ]?.includes(selectedOperatorsValue)
  ) {
    componentTwo = RHFTextField;
    componentPropsTwo = {
      label: selectedAttributesValues,
      placeholder: `Enter ${selectedAttributesValues}`,
    };
  } else if (
    [
      operatorsConstantsValues?.isKnown,
      operatorsConstantsValues?.isUnknown,
    ]?.includes(selectedOperatorsValue)
  ) {
    componentTwo = Box;
  }
  if (!termData) {
    return [
      {
        id: 1,
        componentProps: {
          name: 'name',
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
          name: 'description',
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
          name: 'logo',
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
          required: true,
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
          required: true,
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
          name: 'attribute',
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
          name: 'contacts',
          label: 'Contacts',
          fullWidth: true,
          ...componentPropsContact,
        },
        component: componentContact,
      },
      {
        id: 11,
        componentProps: {
          name: 'operator',
          label: 'Operator',
          fullWidth: true,
          ...componentProps,
        },
        component: component,
      },
      {
        id: 12,
        componentProps: {
          name: 'fieldValue',
          fullWidth: true,
          ...componentPropsTwo,
        },
        component: componentTwo,
      },
    ];
  }
};
