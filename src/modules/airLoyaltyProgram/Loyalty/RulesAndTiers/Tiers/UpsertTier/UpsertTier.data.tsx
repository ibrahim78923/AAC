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
    label: 'Contacts',
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
  { value: 'equals', label: 'Equals' },
  { value: 'not equals', label: 'Not Equals' },
  { value: 'is known', label: 'Known' },
  { value: 'is unknown', label: 'Unknown' },
];
export const dateOperator = [
  { value: 'equals', label: 'Equals' },
  { value: 'not equals', label: 'Not Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'is known', label: 'Known' },
  { value: 'is unknown', label: 'Unknown' },
];
export const ageOperator = [
  { value: 'equals', label: 'Equals' },
  { value: 'not equals', label: 'Not Equals' },
  { value: 'greater than', label: 'Greater Than' },
  { value: 'less than', label: 'Less Than' },
  { value: 'is known', label: 'Known' },
  { value: 'is unknown', label: 'Unknown' },
];
export const lastTransactionOperator = [
  { value: 'equals', label: 'Equals' },
  { value: 'not equals', label: 'Not Equals' },
  { value: 'before', label: 'Before' },
  { value: 'after', label: 'After' },
  { value: 'is known', label: 'Known' },
  { value: 'is unknown', label: 'Unknown' },
];

export const constantsValues = {
  SELECT_CONTACT: 'Contacts',
  firstName: 'First Name',
  lastName: 'Last Name',
  address: 'Address',
  phoneNumber: 'Telephone number',
  AGE: 'Age',
  LAST_TRANSACTION_DATE: 'Last transaction date',
  NO_OF_TRANSACTIONS: 'Number of transactions',
  TOTAL_RECEIVED_CREDITS: 'Total credits received',
  type: 'CONTACTS',
};

export const upsertTierValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()
    ?.required('Required')
    ?.matches(/^[a-zA-Z\s]+$/, 'Must contain only letters')
    ?.min(1, 'Must be at least 1 word')
    ?.max(30, 'Must be at most 30 words'),
  description: Yup?.string()
    ?.required('Required')
    ?.min(1, 'Must be at least 1 word')
    ?.max(50, 'Must be at most 50 words'),
  logo: Yup?.mixed()?.nullable(),
  amount: Yup?.string()
    ?.required('Required')
    ?.matches(/^[0-9]+$/, 'Must be only digits')
    ?.min(1, 'Must be exactly 1 digits')
    ?.max(10, 'Must be exactly 10 digits'),
  points: Yup?.string()
    ?.required('Required')
    ?.matches(/^[0-9]+$/, 'Must be only digits')
    ?.min(1, 'Must be exactly 1 digits')
    ?.max(10, 'Must be exactly 10 digits'),
  type: Yup?.string(),
  attribute: Yup?.mixed()?.when('type', {
    is: constantsValues?.type,
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.nullable(),
  }),
  operator: Yup?.mixed()?.when(['type', 'attribute'], {
    is: (type: string, attribute: any) =>
      type === constantsValues?.type &&
      attribute?.label !== constantsValues?.SELECT_CONTACT,
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.nullable(),
  }),
  contacts: Yup?.array()?.when(['type', 'attribute'], {
    is: (type: string, attribute: any) =>
      type === constantsValues?.type &&
      attribute?.label === constantsValues?.SELECT_CONTACT,
    then: (schema: any) => schema?.min(1, 'Required'),
    otherwise: (schema: any) => schema?.nullable(),
  }),
  fieldValue: Yup?.string(),
});

export const upsertTierDefaultValues = (formData: any) => {
  const allOperators = [
    ...namesOperator,
    ...dateOperator,
    ...ageOperator,
    ...lastTransactionOperator,
  ];

  return {
    name: formData?.name ?? '',
    description: formData?.description ?? '',
    logo: null,
    amount: formData?.amount ?? '',
    points: formData?.points ?? '',
    type: 'CONTACTS',
    attribute:
      attributesData?.find(
        (attribute: any) => attribute?.value === formData?.attribute,
      ) ?? null,
    operator:
      allOperators?.find(
        (operator: any) => operator?.value === formData?.operator,
      ) ?? null,
    fieldValue: formData?.fieldValue ?? '',
    contacts: formData?.contacts ?? [],
  };
};

export const operatorsConstantsValues = {
  equals: 'Equals',
  notEquals: 'Not Equals',
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
      options: namesOperator,
    };
  } else if (
    [constantsValues?.address, constantsValues?.phoneNumber]?.includes(
      selectedAttributesValues,
    )
  ) {
    component = RHFAutocomplete;
    componentProps = {
      options: dateOperator,
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
      options: ageOperator,
    };
  } else if (
    [constantsValues?.LAST_TRANSACTION_DATE]?.includes(selectedAttributesValues)
  ) {
    component = RHFAutocomplete;
    componentProps = {
      options: lastTransactionOperator,
    };
  } else {
    component = Box;
  }
  let componentPropsTwo: any = {};
  let componentTwo: any = Box;
  if (
    [
      constantsValues?.AGE,
      constantsValues?.NO_OF_TRANSACTIONS,
      constantsValues?.TOTAL_RECEIVED_CREDITS,
      constantsValues?.LAST_TRANSACTION_DATE,
      constantsValues?.phoneNumber,
      constantsValues?.firstName,
      constantsValues?.lastName,
      constantsValues?.address,
    ]?.includes(selectedAttributesValues) &&
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
      type:
        selectedAttributesValues === constantsValues?.phoneNumber ||
        selectedAttributesValues === constantsValues?.AGE ||
        selectedAttributesValues === constantsValues?.NO_OF_TRANSACTIONS ||
        selectedAttributesValues === constantsValues?.TOTAL_RECEIVED_CREDITS ||
        selectedAttributesValues === constantsValues?.LAST_TRANSACTION_DATE
          ? 'number'
          : 'text',
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
          type: 'number',
          placeholder: 'Enter Number',
        },
        component: RHFTextField,
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
          placeholder: 'Enter Points',
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
          multiple: true,
          required: true,
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
          required: true,
          placeholder: 'select',
          getOptionLabel: (option: any) => option?.label,
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
