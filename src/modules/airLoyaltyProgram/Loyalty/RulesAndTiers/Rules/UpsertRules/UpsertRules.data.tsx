import {
  RHFAutocomplete,
  RHFDateRangePicker,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  LOYALTY_RULES_ATTRIBUTES_MAPPED,
  OPERATORS_MAPPED,
} from '@/constants/api-mapped';
import {
  LOYALTY_RULES_ATTRIBUTES,
  OPERATORS,
  RULES_BENEFIT_TYPE,
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

export const tiersListsDropdown = ['Base', 'Bronze', 'Gold', 'Silver'];

export const amountOperatorOption = [
  {
    _id: OPERATORS?.EQUAL_TO,
    label: OPERATORS_MAPPED?.EQUAL_TO,
  },
  {
    _id: OPERATORS?.GREATER_THAN,
    label: OPERATORS_MAPPED?.GREATER_THAN,
  },
  {
    _id: OPERATORS?.GREATER_THEN_AND_EQUAL_TO,
    label: OPERATORS_MAPPED?.GREATER_THEN_AND_EQUAL_TO,
  },
  {
    _id: OPERATORS?.LESS_THEN,
    label: OPERATORS_MAPPED?.LESS_THEN,
  },
  {
    _id: OPERATORS?.LESS_THEN_OR_EQUAL_TO,
    label: OPERATORS_MAPPED?.LESS_THEN_OR_EQUAL_TO,
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
      type: 'number',
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
            name: 'discount',
            label: 'Give discount',
            placeholder: 'Enter discount',
            onChange: (e: any) =>
              onChangeCustom?.(e, 'discount', 'awardPoints'),
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
      options: tiersListsDropdown,
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
    component: RHFAutocomplete,
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
