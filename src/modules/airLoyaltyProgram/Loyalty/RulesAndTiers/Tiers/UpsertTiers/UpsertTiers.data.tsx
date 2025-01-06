import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Box, InputAdornment, Typography } from '@mui/material';
import * as Yup from 'yup';
import { GetTierAttributeListDropdown } from '../TiersFormFields/GetTierAttributeListDropdown';
import { GetContactsListDropdown } from '../TiersFormFields/GetContactsListDropdown';
import {
  LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES,
  LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR,
  LOYALTY_PROGRAM_LOYALTY_TIERS_TYPE,
} from '@/constants/api';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { PoundSignIcon } from '@/assets/icons';
import { Attachments } from '@/components/Attachments';
import { AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS } from '@/constants/permission-keys';

const {
  LOYALTY_PROGRAM_TIERS_NAME_MAX_CHARACTERS,
  LOYALTY_PROGRAM_TIERS_DESCRIPTION_MAX_CHARACTERS,
} = CHARACTERS_LIMIT ?? {};

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
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.CURRENT_POINTS_BALANCE,
    label: 'Current points balance',
    description: 'Contact Current points balance',
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.TOTAL_POINTS_REDEEMED,
    label: 'Total points redeemed',
    description: 'The total number of points contact have redeemed',
  },
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

export const dateOperatorOptions = [
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.EQUAL,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.EQUAL,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.NOT_EQUAL,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.NOT_EQUAL,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.BEFORE_DATE,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.BEFORE,
  },
  {
    _id: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.AFTER_DATE,
    label: LOYALTY_PROGRAM_LOYALTY_TIERS_OPERATOR?.AFTER,
  },
];

export const ATTRIBUTE_FIELD_MAP = {
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.FIRST_NAME]: {
    field: RHFTextField,
    type: 'text',
  },
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_NAME]: {
    field: RHFTextField,
    type: 'text',
  },
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.ADDRESS]: {
    field: RHFTextField,
    type: 'text',
  },
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.PHONE_NUMBER]: {
    field: RHFTextField,
    type: 'text',
  },
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.AGE]: {
    field: RHFTextField,
    type: 'number',
  },
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_TRANSACTION_AT]: {
    field: RHFDatePicker,
  },
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.NO_OF_TRANSACTIONS]: {
    field: RHFTextField,
    type: 'number',
  },
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.CURRENT_POINTS_BALANCE]: {
    field: RHFTextField,
    type: 'number',
  },
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.TOTAL_POINTS_REDEEMED]: {
    field: RHFTextField,
    type: 'number',
  },
};

export const ATTRIBUTE_OPERATOR_MAP = {
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.FIRST_NAME]:
    stringsOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_NAME]: stringsOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.ADDRESS]: stringsOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.PHONE_NUMBER]:
    stringsOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.AGE]: numberOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_TRANSACTION_AT]:
    dateOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.NO_OF_TRANSACTIONS]:
    numberOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.CURRENT_POINTS_BALANCE]:
    numberOperatorOptions,
  [LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.TOTAL_POINTS_REDEEMED]:
    numberOperatorOptions,
};

export const upsertTiersFormDefaultValue = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    logo: null,
    amount: data?.amount ?? 0,
    points: data?.points ?? 0,
    attribute: !!data?.attribute
      ? tiersAttributesOptions?.find(
          (item: any) => item?._id === data?.attribute,
        )
      : '',
    type: LOYALTY_PROGRAM_LOYALTY_TIERS_TYPE?.CONTACTS,
    contacts: data?.contacts ?? [],
    operator: !!data?.operator
      ? { _id: data?.operator, label: data?.operator }
      : null,
    fieldValue: data?.fieldValue ?? '',
  };
};

export const upsertTiersFormValidationSchema = (formStep: number) =>
  Yup?.object()?.shape({
    ...(formStep === FORM_STEP_CONSTANT?.FIRST_STEP
      ? {
          name: Yup?.string()
            ?.trim()
            ?.required('Name is required')
            ?.max(
              LOYALTY_PROGRAM_TIERS_NAME_MAX_CHARACTERS,
              `Maximum characters limit is ${LOYALTY_PROGRAM_TIERS_NAME_MAX_CHARACTERS}`,
            )
            ?.test(
              'contains-alphabet',
              'Description must be a string',
              (value) => !value || REGEX?.ALPHABETS?.test(value),
            ),
          description: Yup?.string()
            ?.trim()
            ?.required('Description is required')
            ?.max(
              LOYALTY_PROGRAM_TIERS_DESCRIPTION_MAX_CHARACTERS,
              `Maximum characters limit is ${LOYALTY_PROGRAM_TIERS_DESCRIPTION_MAX_CHARACTERS}`,
            )
            ?.test(
              'contains-alphabet',
              'Description must be a string',
              (value) => !value || REGEX?.ALPHABETS?.test(value),
            ),
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
                  Yup?.string()
                    ?.trim()
                    ?.required('Value is required')
                    ?.when('attribute', {
                      is: (attribute: any) =>
                        [
                          LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.FIRST_NAME,
                          LOYALTY_PROGRAM_LOYALTY_TIERS_ATTRIBUTES?.LAST_NAME,
                        ]?.includes(attribute?._id),
                      then: (schema) =>
                        schema.test(
                          '',
                          'Invalid value, only alphabets are allowed',
                          (value) =>
                            !value || REGEX?.ONLY_ALPHABETS?.test(value),
                        ),
                      otherwise: (schema) => schema,
                    }),
                otherwise: () => Yup?.string()?.trim(),
              }),
          }
        : {}),
  });

export const upsertTiersBasicFormFieldsDynamic = (
  formStep: number,
  watch: any,
  clearErrors: any,
  setValue: any,
  trigger: any,
  tierId: string,
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
              onBlurHandler: async () => await trigger('name'),
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
              onBlurHandler: async () => await trigger('description'),
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
          ...(!!tierId
            ? [
                {
                  id: 3.5,
                  component: Box,
                  heading: (
                    <>
                      <Typography
                        variant="body1"
                        fontWeight={'fontWeightSmall'}
                        color="slateBlue.main"
                        mb={2}
                      >
                        {' '}
                        Attachments{' '}
                      </Typography>
                      <Box maxHeight={'20vh'}>
                        <Attachments
                          recordId={tierId}
                          permissionKey={[
                            AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS?.EDIT_OR_DELETE_TIERS,
                          ]}
                          colSpan={{ sm: 12, lg: 12 }}
                        />
                      </Box>
                    </>
                  ),
                  componentProps: {},
                },
              ]
            : []),
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
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PoundSignIcon />
                  </InputAdornment>
                ),
              },
              onBlurHandler: async () => await trigger('amount'),
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
              onBlurHandler: async () => await trigger('points'),
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
              clearErrors,
              setValue,
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
                        component:
                          ATTRIBUTE_FIELD_MAP?.[watch('attribute')?._id]?.field,
                        componentProps: {
                          name: 'fieldValue',
                          label: `Enter ${watch('attribute')?.label}`,
                          placeholder: `Enter ${watch('attribute')?.label}`,
                          fullWidth: true,
                          required: true,
                          type: ATTRIBUTE_FIELD_MAP?.[watch('attribute')?._id]
                            ?.type,
                          inputProps: {
                            min: 0,
                          },
                        },
                      },
                    ]
                  : []),
              ]
            : []),
        ]),
  ];
};
