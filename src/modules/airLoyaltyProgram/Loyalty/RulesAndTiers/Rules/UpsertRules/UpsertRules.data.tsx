import {
  RHFAutocomplete,
  RHFDateRangePicker,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  LOYALTY_RULES_ATTRIBUTES_MAPPED,
  LOYALTY_TIERS_REWARD_TYPE_MAPPED,
  RULES_AUDIENCE_TYPE_MAPPED,
  RULES_TIME_SPAN_MAPPED,
} from '@/constants/api-mapped';
import { CHARACTERS_LIMIT } from '@/constants/validation';
import * as Yup from 'yup';
import { useGetTiersListDropdown } from '../RulesFormField/useGetTiersListDropdown';
import {
  LOYALTY_PROGRAM_RULES_BENEFIT_TYPE,
  LOYALTY_PROGRAM_RULES_TIME_SPAN,
  LOYALTY_PROGRAM_TIERS_REWARD_TYPE,
} from '@/constants/api';
import { localeDateTime } from '@/lib/date-time';
import {
  LOYALTY_RULES_ATTRIBUTES,
  RULES_AUDIENCE_TYPE,
  RULES_OPERATORS,
} from '@/constants/loyalty-program';

export const rulesAudienceType = [
  {
    _id: RULES_AUDIENCE_TYPE?.CUSTOMER,
    label: RULES_AUDIENCE_TYPE_MAPPED?.[RULES_AUDIENCE_TYPE?.CUSTOMER],
  },
];

export const attributesOption = [
  {
    label:
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.[
        LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT
      ],
    _id: LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
    label:
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.[
        LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION
      ],
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
    label:
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.[LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY],
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
    label:
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.[LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS],
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
    label:
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.[LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY],
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE,
    label:
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.[
        LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE
      ],
  },
];

export const amountOperatorOption = [
  {
    _id: RULES_OPERATORS?.EQUAL_TO,
    label: RULES_OPERATORS?.EQUAL_TO,
  },
  {
    _id: RULES_OPERATORS?.GREATER_THAN,
    label: RULES_OPERATORS?.GREATER_THAN,
  },
  {
    _id: RULES_OPERATORS?.GREATER_THAN_OR_EQUAL_TO,
    label: RULES_OPERATORS?.GREATER_THAN_OR_EQUAL_TO,
  },
  {
    _id: RULES_OPERATORS?.LESS_THAN,
    label: RULES_OPERATORS?.LESS_THAN,
  },
  {
    _id: RULES_OPERATORS?.LESS_THAN_OR_EQUAL_TO,
    label: RULES_OPERATORS?.LESS_THAN_OR_EQUAL_TO,
  },
];

export const discountTypeOption = [
  {
    _id: LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FIXED_DISCOUNT,
    label:
      LOYALTY_TIERS_REWARD_TYPE_MAPPED?.[
        LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FIXED_DISCOUNT
      ],
  },
  {
    _id: LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FLAT_DISCOUNT,
    label:
      LOYALTY_TIERS_REWARD_TYPE_MAPPED?.[
        LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FLAT_DISCOUNT
      ],
  },
];

export const timeSpanOptions = [
  {
    _id: LOYALTY_PROGRAM_RULES_TIME_SPAN?.THIS_WEEK,
    label: RULES_TIME_SPAN_MAPPED?.[LOYALTY_PROGRAM_RULES_TIME_SPAN?.THIS_WEEK],
  },
  {
    _id: LOYALTY_PROGRAM_RULES_TIME_SPAN?.THIS_MONTH,
    label:
      RULES_TIME_SPAN_MAPPED?.[LOYALTY_PROGRAM_RULES_TIME_SPAN?.THIS_MONTH],
  },
  {
    _id: LOYALTY_PROGRAM_RULES_TIME_SPAN?.LAST_WEEK,
    label: RULES_TIME_SPAN_MAPPED?.[LOYALTY_PROGRAM_RULES_TIME_SPAN?.LAST_WEEK],
  },
  {
    _id: LOYALTY_PROGRAM_RULES_TIME_SPAN?.LAST_MONTH,
    label:
      RULES_TIME_SPAN_MAPPED?.[LOYALTY_PROGRAM_RULES_TIME_SPAN?.LAST_MONTH],
  },
  {
    _id: LOYALTY_PROGRAM_RULES_TIME_SPAN?.CUSTOM_DATE,
    label:
      RULES_TIME_SPAN_MAPPED?.[LOYALTY_PROGRAM_RULES_TIME_SPAN?.CUSTOM_DATE],
  },
];

export const LOYALTY_PROGRAM_LOYALTY_TYPE_MAPPED = {
  [LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FIXED_DISCOUNT]:
    LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.DISCOUNT,
  [LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FLAT_DISCOUNT]:
    LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.DISCOUNT,
  [LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.POINTS]:
    LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.AWARD,
};

export const ATTRIBUTE_FIELDS = {
  [LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT]: 'Add Amount',
  [LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY]: 'Product Qty',
  [LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS]: 'No of Visits',
};

export const TIME_SPAN_FIELDS = {
  [LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY]: 'Add Amount',
  [LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION]: 'Product Qty',
};

export const upsertRulesFormValidationSchema = Yup?.object()?.shape({
  attribute: Yup?.mixed()?.nullable(),
  description: Yup?.string()
    ?.trim()
    ?.max(
      CHARACTERS_LIMIT?.LOYALTY_RULES_DESCRIPTION_MAX_CHARACTERS,
      `maximum ${CHARACTERS_LIMIT?.LOYALTY_RULES_DESCRIPTION_MAX_CHARACTERS} characters`,
    ),
  loyaltyType: Yup?.string()?.required('Please select one'),
  appliedTo: Yup?.mixed()?.nullable()?.required('Applied to is required'),
  attributeValue: Yup?.number()
    ?.typeError('Must be a number')
    ?.when('attribute', {
      is: (value: any) => !!ATTRIBUTE_FIELDS[value?._id],
      then: (schema: any) =>
        schema
          ?.positive('Amount is required')
          ?.max(
            CHARACTERS_LIMIT?.LOYALTY_RULES_ATTRIBUTES_MAX_CHARACTERS,
            `Must be at most ${CHARACTERS_LIMIT?.LOYALTY_RULES_ATTRIBUTES_MAX_CHARACTERS?.toString()
              ?.length} digits`,
          ),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
  operator: Yup?.mixed()
    ?.nullable()
    ?.when('attribute', {
      is: (value: any) => !!ATTRIBUTE_FIELDS[value?._id],
      then: (schema: any) => schema?.required('operator is required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
  timeSpanOf: Yup?.mixed()
    ?.nullable()
    ?.when('attribute', {
      is: (value: any) => !!TIME_SPAN_FIELDS?.[value?._id],
      then: (schema: any) => schema?.required('time Span is required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
  discountType: Yup?.mixed()
    ?.nullable()
    ?.when('loyaltyType', {
      is: (value: any) =>
        value === LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.DISCOUNT,
      then: (schema: any) => schema?.required('Discount Type is required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
  rewards: Yup?.number()
    ?.typeError('Must be a number')
    ?.when('loyaltyType', {
      is: (value: any) => !!value,
      then: (schema: any) =>
        schema
          ?.positive('Amount is required')
          ?.max(
            CHARACTERS_LIMIT?.LOYALTY_RULES_REWARDS_MAX_CHARACTERS,
            `Must be at most ${CHARACTERS_LIMIT?.LOYALTY_RULES_REWARDS_MAX_CHARACTERS?.toString()
              ?.length} digits`,
          ),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const upsertRulesFormDefaultValues = (data?: any) => {
  return {
    attribute: !!data?.attribute
      ? {
          _id: data?.attribute,
          label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.[data?.attribute],
        }
      : null,
    customDate: {
      startDate:
        data?.timeSpan?.type === LOYALTY_PROGRAM_RULES_TIME_SPAN?.CUSTOM_DATE
          ? localeDateTime(data?.timeSpan?.startDate)
          : new Date(),
      endDate:
        data?.timeSpan?.type === LOYALTY_PROGRAM_RULES_TIME_SPAN?.CUSTOM_DATE
          ? localeDateTime(data?.timeSpan?.endDate)
          : new Date(),
      key: 'selection',
    },
    timeSpanOf: data?.timeSpan?.type
      ? {
          _id: data?.timeSpan?.type,
          label: RULES_TIME_SPAN_MAPPED?.[data?.timeSpan?.type],
        }
      : null,
    awardPoints: '',
    loyaltyType: !!data?.rewardType
      ? LOYALTY_PROGRAM_LOYALTY_TYPE_MAPPED?.[data?.rewardType]
      : '',
    rewards: data?.rewards ?? 0,
    appliedTo: data?.tierDetails ?? null,
    attributeValue:
      data?.attributeValue && ATTRIBUTE_FIELDS?.[data?.attribute]
        ? data?.attributeValue
        : 0,
    operator:
      data?.operator && ATTRIBUTE_FIELDS?.[data?.attribute]
        ? { _id: data?.operator, label: data?.operator }
        : null,
    description: data?.description ?? '',
    discountType:
      discountTypeOption?.find((item: any) => item?._id === data?.rewardType) ??
      null,
  };
};

export const upsertRulesFormFieldsDynamic = (
  watchForLoyaltyType: any,
  watchForTimeSpan: any,
  watchForAttribute: any,
  watchForDiscountType: any,
) => [
  ...(!!ATTRIBUTE_FIELDS?.[watchForAttribute?._id]
    ? [
        {
          id: 1,
          componentProps: {
            name: 'operator',
            label: ATTRIBUTE_FIELDS?.[watchForAttribute?._id],
            placeholder: 'operator',
            required: true,
            options: amountOperatorOption,
            getOptionLabel: (option: any) => option?.label,
          },
          component: RHFAutocomplete,
          md: 5,
        },
        {
          id: 2,
          componentProps: {
            name: 'attributeValue',
            label: '\u00a0\u00a0',
            placeholder: 'Enter amount',
          },

          component: RHFTextField,
          md: 7,
        },
      ]
    : []),
  ...(!!TIME_SPAN_FIELDS?.[watchForAttribute?._id]
    ? [
        {
          id: 7,
          componentProps: {
            name: 'timeSpanOf',
            label: 'Time span of',
            placeholder: 'Select',
            options: timeSpanOptions,
            getOptionLabel: (option: any) => option?.label,
          },
          component: RHFAutocomplete,
          md: 12,
        },
        ...(watchForTimeSpan?._id ===
        LOYALTY_PROGRAM_RULES_TIME_SPAN?.CUSTOM_DATE
          ? [
              {
                id: 70,
                componentProps: {
                  name: 'customDate',
                  label: 'Custom Date',
                  placeholder: 'Select Custom Date',
                },
                component: RHFDateRangePicker,
                md: 12,
              },
            ]
          : []),
      ]
    : []),
  {
    id: 45,
    componentProps: {
      name: 'loyaltyType',
      row: false,
      options: [
        {
          value: LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.DISCOUNT,
          label: 'Give discount',
        },
        {
          value: LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.AWARD,
          label: 'Award points',
        },
      ],
    },
    component: RHFRadioGroup,
  },
  ...(watchForLoyaltyType === LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.DISCOUNT
    ? [
        {
          id: 3,
          componentProps: {
            name: 'discountType',
            label: 'Discount Type',
            placeholder: 'Select discount',
            required: true,
            options: discountTypeOption,
            getOptionLabel: (option: any) => option?.label,
          },
          component: RHFAutocomplete,
          md: 5,
        },
        {
          id: 4,
          componentProps: {
            name: 'rewards',
            label:
              watchForDiscountType?._id ===
              LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FIXED_DISCOUNT
                ? 'Fixed'
                : watchForDiscountType?._id ===
                    LOYALTY_PROGRAM_TIERS_REWARD_TYPE?.FLAT_DISCOUNT
                  ? 'Percentage'
                  : '\u00a0\u00a0',
            required: !!watchForDiscountType?._id && true,
            placeholder: 'Enter discount',
          },
          component: RHFTextField,
          md: 7,
        },
      ]
    : []),
  ...(watchForLoyaltyType === LOYALTY_PROGRAM_RULES_BENEFIT_TYPE?.AWARD
    ? [
        {
          id: 487,
          componentProps: {
            name: 'rewards',
            label: 'Points',
            required: true,
            placeholder: 'Enter award points',
          },
          component: RHFTextField,
          md: 12,
        },
      ]
    : []),
  {
    id: 5,
    component: useGetTiersListDropdown,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter description',
      multiline: true,
      minRows: 4,
    },
    component: RHFTextField,
    md: 12,
  },
];
