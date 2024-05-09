import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDateRangePicker,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import {
  LOYALTY_RULES_ATTRIBUTES_MAPPED,
  LOYALTY_TIERS_REWARD_TYPE_MAPPED,
  RULES_TIME_SPAN_MAPPED,
} from '@/constants/api-mapped';
import {
  LOYALTY_RULES_ATTRIBUTES,
  LOYALTY_TIERS_REWARD_TYPE,
  RULES_BENEFIT_TYPE,
  RULES_OPERATORS,
  RULES_TIME_SPAN,
} from '@/constants/strings';
import * as Yup from 'yup';

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
    _id: LOYALTY_TIERS_REWARD_TYPE?.FIXED_DISCOUNT,
    label:
      LOYALTY_TIERS_REWARD_TYPE_MAPPED?.[
        LOYALTY_TIERS_REWARD_TYPE?.FIXED_DISCOUNT
      ],
  },
  {
    _id: LOYALTY_TIERS_REWARD_TYPE?.FLAT_DISCOUNT,
    label:
      LOYALTY_TIERS_REWARD_TYPE_MAPPED?.[
        LOYALTY_TIERS_REWARD_TYPE?.FLAT_DISCOUNT
      ],
  },
];

export const timeSpanOptions = [
  {
    _id: RULES_TIME_SPAN?.THIS_WEEK,
    label: RULES_TIME_SPAN_MAPPED?.[RULES_TIME_SPAN?.THIS_WEEK],
  },
  {
    _id: RULES_TIME_SPAN?.THIS_MONTH,
    label: RULES_TIME_SPAN_MAPPED?.[RULES_TIME_SPAN?.THIS_MONTH],
  },
  {
    _id: RULES_TIME_SPAN?.LAST_WEEK,
    label: RULES_TIME_SPAN_MAPPED?.[RULES_TIME_SPAN?.LAST_WEEK],
  },
  {
    _id: RULES_TIME_SPAN?.LAST_MONTH,
    label: RULES_TIME_SPAN_MAPPED?.[RULES_TIME_SPAN?.LAST_MONTH],
  },
  {
    _id: RULES_TIME_SPAN?.CUSTOM_DATE,
    label: RULES_TIME_SPAN_MAPPED?.[RULES_TIME_SPAN?.CUSTOM_DATE],
  },
];

export const upsertRulesFormValidationSchema = Yup?.object()?.shape({
  attribute: Yup?.mixed()?.nullable(),
  description: Yup?.string()?.trim()?.max(100, 'maximum 100 characters only'),
  loyaltyType: Yup?.string()?.required('Please select one'),
  appliedTo: Yup?.mixed()?.nullable()?.required('Applied to is required'),
});

export const upsertRulesFormDefaultValues = {
  attribute: null,
  accountCreatedIn: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
  timeSpanOf: null,
  awardPoints: '',
  loyaltyType: '',
  discount: '',
  percentageOff: '',
  flatOff: '',
  appliedTo: null,
  organizationNumber: [],
};

export const upsertRulesFormFieldsDynamic = (
  watchForLoyaltyType: any,
  apiQueryTiers: any,
  watchForTimeSpan: any,
  watchForAttribute: any,
  watchForDiscountType: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'addAmount',
      label:
        watchForAttribute?._id === LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS
          ? 'No of Visits'
          : 'Add Amount',
      placeholder: 'operator',
      required: true,
      options: amountOperatorOption,
      getOptionLabel: (option: any) => option?.label,
    },
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
      LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
    ],
    component: RHFAutocomplete,
    md: 5,
  },
  {
    id: 2,
    componentProps: {
      name: 'amount',
      label: '\u00a0\u00a0',
      placeholder: 'Enter amount',
    },
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
      LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
    ],
    component: RHFTextField,
    md: 7,
  },
  {
    id: 7,
    componentProps: {
      name: 'timeSpanOf',
      label: 'Time span of',
      placeholder: 'Select',
      options: timeSpanOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
      LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
    ],
    component: RHFAutocomplete,
    md: 12,
  },
  ...(watchForTimeSpan?._id === RULES_TIME_SPAN?.CUSTOM_DATE
    ? [
        {
          id: 70,
          componentProps: {
            name: 'customDate',
            label: 'Custom Date',
            placeholder: 'Select Custom Date',
          },
          attributeType: [
            LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
            LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
          ],
          component: RHFDateRangePicker,
          md: 12,
        },
      ]
    : []),
  {
    id: 45,
    componentProps: {
      name: 'loyaltyType',
      row: false,
      options: [
        { value: RULES_BENEFIT_TYPE?.DISCOUNT, label: 'Give Discount' },
        {
          value: RULES_BENEFIT_TYPE?.AWARD,
          label: 'Award Points',
        },
      ],
    },
    component: RHFRadioGroup,
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
      LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
      LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
      LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE,
    ],
  },
  ...(watchForLoyaltyType === RULES_BENEFIT_TYPE?.DISCOUNT
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
          attributeType: [
            LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
            LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
            LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
            LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
            LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
            LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE,
          ],
          component: RHFAutocomplete,
          md: 5,
        },
        {
          id: 4,
          componentProps: {
            name: 'discount',
            label:
              watchForDiscountType?._id ===
              LOYALTY_TIERS_REWARD_TYPE?.FIXED_DISCOUNT
                ? 'Fixed'
                : watchForDiscountType?._id ===
                    LOYALTY_TIERS_REWARD_TYPE?.FLAT_DISCOUNT
                  ? 'Percentage'
                  : '\u00a0\u00a0',
            required: !!watchForDiscountType?._id && true,
            placeholder: 'Enter discount',
          },
          attributeType: [
            LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
            LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
            LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
            LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
            LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
            LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE,
          ],
          component: RHFTextField,
          md: 7,
        },
      ]
    : []),
  ...(watchForLoyaltyType === RULES_BENEFIT_TYPE?.AWARD
    ? [
        {
          id: 487,
          componentProps: {
            name: 'awardPoints',
            label: 'Points',
            placeholder: 'Enter award points',
          },
          attributeType: [
            LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
            LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
            LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
            LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
            LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
            LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE,
          ],
          component: RHFTextField,
          md: 12,
        },
      ]
    : []),
  {
    id: 5,
    componentProps: {
      name: 'appliedTo',
      label: 'Applied to',
      placeholder: 'Select',
      required: true,
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      },
      apiQuery: apiQueryTiers,
      getOptionLabel: (option: any) => option?.name,
    },
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
      LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
      LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE,
    ],
    component: RHFAutocompleteAsync,
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
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
      LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
      LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
      LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE,
    ],
    component: RHFTextField,
    md: 12,
  },
];
