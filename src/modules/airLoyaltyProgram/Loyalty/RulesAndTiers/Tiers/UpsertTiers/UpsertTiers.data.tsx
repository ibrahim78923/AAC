import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { GetTierAttributeListDropdown } from '../TiersFormFields/GetTierAttributeListDropdown';
import { GetContactsListDropdown } from '../TiersFormFields/GetContactsListDropdown';
import {
  LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES,
  LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR,
} from '@/constants/api';

export const FORM_STEP_CONSTANT = {
  FIRST_STEP: 1,
  SECOND_STEP: 2,
};

export const tiersAttributesOptions = [
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT,
    label: 'Contacts',
    description: 'Select one or multiple contacts',
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.FIRST_NAME,
    label: 'First Name',
    description: 'The Contact’s first name',
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_NAME,
    label: 'Last Name',
    description: 'The contact’s last name',
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.ADDRESS,
    label: 'Address',
    description: 'The contact’s address information',
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.PHONE_NUMBER,
    label: 'Telephone number',
    description: 'The contact’s phone number',
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.AGE,
    label: 'Age',
    description: 'The contact’s age',
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_TRANSACTION_AT,
    label: 'Last transaction date',
    description: 'The date of the contact’s most recent loyalty transaction',
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.NO_OF_TRANSACTIONS,
    label: 'Number of transactions',
    description: 'The number of loyalty transaction the contact has had',
  },
  //TODO: will add on api change
  // {
  //   _id: 'TOTAL_RECEIVED_CREDITS',
  //   label: 'Total credits received',
  //   description:
  //     'The total number of credits the contact have received to date',
  // },
];

export const stringsOperatorOptions = [
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.EQUAL,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.EQUAL,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.NOT_EQUAL,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.NOT_EQUAL,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.CONTAINS,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.CONTAINS,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_KNOWN,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_KNOWN,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_UNKNOWN,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_UNKNOWN,
  },
];

export const numberOperatorOptions = [
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.EQUAL,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.EQUAL,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.NOT_EQUAL,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.NOT_EQUAL,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.GREATER_THAN,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.GREATER_THAN,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.LESS_THAN,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.LESS_THAN,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_KNOWN,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_KNOWN,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_UNKNOWN,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_UNKNOWN,
  },
];

export const quantityOperatorOptions = [
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.EQUAL,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.EQUAL,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.NOT_EQUAL,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.NOT_EQUAL,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.BEFORE,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.BEFORE,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.AFTER,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.AFTER,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_KNOWN,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_KNOWN,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_UNKNOWN,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.IS_UNKNOWN,
  },
];

export const ATTRIBUTE_OPERATOR_MAP = {
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.FIRST_NAME]:
    stringsOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_NAME]: stringsOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.ADDRESS]: stringsOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.PHONE_NUMBER]:
    stringsOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.AGE]: numberOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_TRANSACTION_AT]:
    quantityOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.NO_OF_TRANSACTIONS]:
    quantityOperatorOptions,
};
const TIERS_TYPE = {
  CONTACTS: 'CONTACTS',
};
export const upsertTiersFormDefaultValue = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    logo: null,
    amount: data?.amount ?? 0,
    points: data?.points ?? 0,
    attribute: data?.attribute ?? '',
    type: TIERS_TYPE?.CONTACTS,
    contacts: data?.contacts ?? [],
    operator: data?.operator ?? null,
    fieldValue: data?.fieldValue ?? '',
  };
};

export const upsertTiersFormValidationSchema = (formStep: number) =>
  Yup?.object()?.shape({
    ...(formStep === FORM_STEP_CONSTANT?.FIRST_STEP
      ? {
          name: Yup?.string()?.trim()?.required('Name is required'),
          description: Yup?.string()
            ?.trim()
            ?.required('Description is required'),
          logo: Yup?.mixed()?.nullable(),
          amount: Yup?.number()
            ?.typeError('Not a number')
            ?.positive('Greater than zero')
            ?.required('Amount is required'),
          points: Yup?.number()
            ?.typeError('Not a number')
            ?.positive('Greater than zero')
            ?.required('Amount is required'),
        }
      : formStep === FORM_STEP_CONSTANT?.SECOND_STEP
        ? {
            type: Yup?.string()?.trim()?.required('Type is required'),
            attribute: Yup?.mixed()
              ?.nullable()
              ?.required('Attribute is required'),
            contacts: Yup?.array()?.when('attribute', {
              is: (value: any) =>
                value?._id ===
                LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT,
              then: () => Yup?.array()?.min(1, 'Contact is required'),
              otherwise: () => Yup?.array(),
            }),
            operator: Yup?.mixed()
              ?.nullable()
              ?.when('attribute', {
                is: (value: any) =>
                  value?._id !==
                  LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT,
                then: () =>
                  Yup?.mixed()?.nullable()?.required('Operator is required'),
                otherwise: () => Yup?.mixed()?.nullable(),
              }),
            fieldValue: Yup?.string()
              ?.trim()
              ?.when('operator', {
                is: (value: any) => !!value?._id,
                then: () =>
                  Yup?.string()?.trim()?.required('Value is required'),
                otherwise: () => Yup?.string()?.trim(),
              }),
          }
        : {}),
  });

export const upsertTiersBasicFormFieldsDynamic = (
  formStep: number,
  watch: any,
) => {
  return [
    ...(formStep === FORM_STEP_CONSTANT?.FIRST_STEP
      ? [
          {
            id: 1,
            component: RHFTextField,
            componentProps: {
              name: 'name',
              label: 'Tier name',
              placeholder: 'Enter tier name',
              fullWidth: true,
              required: true,
            },
          },
          {
            id: 2,
            component: RHFTextField,
            componentProps: {
              name: 'description',
              label: 'Tier description',
              placeholder: 'Enter tier description',
              fullWidth: true,
              required: true,
            },
          },
          {
            id: 3,
            component: RHFDropZone,
            componentProps: {
              name: 'logo',
              label: 'Add image',
              fullWidth: true,
              fileType: 'SVG,PNG, JPG, JPEG (max 2.44 MB)',
              accept: {
                'image/png': ['.png', '.PNG'],
                'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
                'image/svg+xml': ['.svg'],
              },
            },
          },
          {
            id: 4,
            component: Typography,
            heading: 'Points calculation',
            componentProps: {
              color: 'slateBlue.main',
              variant: 'h5',
              fontWeight: 'fontWeightBold',
            },
          },
          {
            id: 5,
            component: RHFTextField,
            componentProps: {
              name: 'amount',
              label: 'If the purchase amount is',
              placeholder: 'Enter amount (e.g., 100)',
              fullWidth: true,
              required: true,
              type: 'number',
              inputProps: {
                min: 0,
              },
            },
          },
          {
            id: 6,
            component: RHFTextField,
            componentProps: {
              name: 'points',
              label: 'The number of points added is',
              placeholder: 'Enter points (e.g., 1)',
              fullWidth: true,
              required: true,
              type: 'number',
              inputProps: {
                min: 0,
              },
            },
          },
        ]
      : [
          {
            id: 1.1,
            component: RHFTextField,
            componentProps: {
              name: 'type',
              label: 'Type',
              placeholder: 'Enter type',
              fullWidth: true,
              required: true,
              disabled: true,
            },
          },
          {
            id: 1.2,
            component: GetTierAttributeListDropdown,
            componentProps: {
              options: tiersAttributesOptions,
            },
          },
          ...(!!watch('attribute')?._id
            ? [
                ...(watch('attribute')?._id ===
                LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.SELECT_CONTACT
                  ? [
                      {
                        id: 1.3,
                        component: GetContactsListDropdown,
                      },
                    ]
                  : [
                      {
                        id: 1.4,
                        component: RHFAutocomplete,
                        componentProps: {
                          name: 'operator',
                          label: 'Operator',
                          placeholder: 'Select operator',
                          fullWidth: true,
                          required: true,
                          options:
                            ATTRIBUTE_OPERATOR_MAP?.[watch('attribute')?._id],
                          getOptionLabel: (option: any) => option?.label,
                          isOptionEqualToValue: (option: any, value: any) =>
                            option?._id === value?._id,
                        },
                      },
                    ]),
                ...(!!watch('operator')
                  ? [
                      {
                        id: 1.5,
                        component: RHFTextField,
                        componentProps: {
                          name: 'fieldValue',
                          label: `Enter ${watch('attribute')?.label}`,
                          placeholder: `Enter ${watch('attribute')?.label}`,
                          fullWidth: true,
                          required: true,
                        },
                      },
                    ]
                  : []),
              ]
            : []),
        ]),
  ];
};
