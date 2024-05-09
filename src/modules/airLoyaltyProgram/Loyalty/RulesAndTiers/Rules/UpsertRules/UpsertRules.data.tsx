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
    label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
    _id: LOYALTY_RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.ACCOUNT_CREATION,
    label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.ACCOUNT_CREATION,
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.PRODUCT_QTY,
    label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.PRODUCT_QTY,
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.NO_OF_VISITS,
    label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.BIRTHDAY,
    label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.BIRTHDAY,
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.FIRST_PURCHASE,
    label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.FIRST_PURCHASE,
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.MONEY_OFF,
    label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.MONEY_OFF,
  },
  {
    _id: LOYALTY_RULES_ATTRIBUTES?.FREE_SHIPPING,
    label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.FREE_SHIPPING,
  },
];

export const validationAttributes = [
  LOYALTY_RULES_ATTRIBUTES_MAPPED?.MONEY_OFF,
  LOYALTY_RULES_ATTRIBUTES_MAPPED?.FREE_SHIPPING,
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
  },
  {
    _id: RULES_TIME_SPAN?.THIS_MONTH,
  },
  {
    _id: RULES_TIME_SPAN?.LAST_WEEK,
  },
  {
    _id: RULES_TIME_SPAN?.LAST_MONTH,
  },
  {
    _id: RULES_TIME_SPAN?.CUSTOM_DATE,
  },
];

export const upsertRulesFormValidationSchema = Yup?.object()?.shape({
  attribute: Yup?.mixed()?.nullable(),
  description: Yup?.string()?.trim()?.max(100, 'maximum 100 characters only'),
  loyaltyType: Yup?.string()?.required('Please select one'),
});

export const upsertRulesFormDefaultValues = {
  attribute: null,
  accountCreatedIn: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
  timeSpanOf: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
  awardPoints: '',
  loyaltyType: '',
  discount: '',
  percentageOff: '',
  flatOff: '',
  appliedTo: null,
  organizationNumber: [],
};

export const upsertRulesFormFieldsDynamic = (
  onChangeCustom: any,
  watchForLoyaltyType: any,
  apiQueryTiers: any,
) => [
  {
    id: 10,
    componentProps: {
      name: 'percentageOff',
      label: 'Percentage Off',
      placeholder: 'Enter percentage off',
      onChange: (e: any) => onChangeCustom?.(e, 'percentageOff', 'flatOff'),
    },
    attributeType: [LOYALTY_RULES_ATTRIBUTES_MAPPED?.MONEY_OFF],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 11,
    componentProps: {
      name: 'flatOff',
      label: 'Flat off (on entire purchase)',
      placeholder: 'Enter flat off',
      onChange: (e: any) => onChangeCustom?.(e, 'flatOff', 'percentageOff'),
    },
    attributeType: [LOYALTY_RULES_ATTRIBUTES_MAPPED?.MONEY_OFF],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'accountCreatedIn',
      label: 'Account created in',
      placeholder: 'Select',
    },
    attributeType: [LOYALTY_RULES_ATTRIBUTES_MAPPED?.ACCOUNT_CREATION],
    component: RHFDateRangePicker,
    md: 12,
  },
  {
    id: 1,
    componentProps: {
      name: 'addAmount',
      label: LOYALTY_RULES_ATTRIBUTES_MAPPED?.FREE_SHIPPING
        ? 'Add purchase amount'
        : 'Add Amount',
      placeholder: 'Enter operator',
      options: amountOperatorOption,
      getOptionLabel: (option: any) => option?.label,
    },
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PRODUCT_QTY,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.FREE_SHIPPING,
    ],
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: 'amount',
      label: '\u00a0\u00a0',
      placeholder: 'Enter amount',
    },
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PRODUCT_QTY,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.FREE_SHIPPING,
    ],
    component: RHFTextField,
    md: 6,
  },
  {
    id: 9,
    componentProps: {
      name: 'shippingFee',
      label: 'Shipping fee',
      placeholder: 'Enter shipping fee',
    },
    attributeType: [LOYALTY_RULES_ATTRIBUTES_MAPPED?.FREE_SHIPPING],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'timeSpanOf',
      label: 'Time span of',
      placeholder: 'Select',
    },
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.BIRTHDAY,
    ],
    component: RHFDateRangePicker,
    md: 12,
  },
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
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.ACCOUNT_CREATION,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PRODUCT_QTY,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.BIRTHDAY,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.FIRST_PURCHASE,
    ],
  },
  ...(watchForLoyaltyType === RULES_BENEFIT_TYPE?.DISCOUNT
    ? [
        {
          id: 3,
          componentProps: {
            name: 'discountType',
            label: 'Discount Type',
            placeholder: 'Enter discount',
            options: discountTypeOption,
            getOptionLabel: (option: any) => option?.label,
          },
          attributeType: [
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.ACCOUNT_CREATION,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.PRODUCT_QTY,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.BIRTHDAY,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.FIRST_PURCHASE,
          ],
          component: RHFAutocomplete,

          md: 5,
        },
        {
          id: 4,
          componentProps: {
            name: 'discount',
            label: 'Discount',
            placeholder: 'Enter discount',
          },
          attributeType: [
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.ACCOUNT_CREATION,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.PRODUCT_QTY,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.BIRTHDAY,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.FIRST_PURCHASE,
          ],
          component: RHFTextField,
          md: 7,
        },
      ]
    : []),
  ...(watchForLoyaltyType === RULES_BENEFIT_TYPE?.AWARD
    ? [
        {
          id: 4,
          componentProps: {
            name: 'awardPoints',
            label: 'Award points',
            placeholder: 'Enter award points',
            onChange: (e: any) =>
              onChangeCustom?.(e, 'awardPoints', 'discount'),
          },
          attributeType: [
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.ACCOUNT_CREATION,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.PRODUCT_QTY,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.BIRTHDAY,
            LOYALTY_RULES_ATTRIBUTES_MAPPED?.FIRST_PURCHASE,
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
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      },
      apiQuery: apiQueryTiers,
      getOptionLabel: (option: any) => option?.name,
    },
    attributeType: [
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.ACCOUNT_CREATION,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.BIRTHDAY,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.FIRST_PURCHASE,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.MONEY_OFF,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.FREE_SHIPPING,
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
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PURCHASE_AMOUNT,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.ACCOUNT_CREATION,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.PRODUCT_QTY,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.NO_OF_VISITS,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.BIRTHDAY,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.FIRST_PURCHASE,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.MONEY_OFF,
      LOYALTY_RULES_ATTRIBUTES_MAPPED?.FREE_SHIPPING,
    ],
    component: RHFTextField,
    md: 12,
  },
];
