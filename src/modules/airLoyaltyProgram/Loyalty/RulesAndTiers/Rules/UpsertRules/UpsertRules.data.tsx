export const upsertRulesGlobalFormFields = [{}];

import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const RULES_ATTRIBUTES = {
  PURCHASE_AMOUNT: 'Purchase amount',
  ACCOUNT_CREATION: 'Account creation',
  PRODUCT_QTY: 'Product Qty',
  NO_OF_VISITS: 'No of Visits',
  BIRTHDAY: 'Birthday',
  FIRST_PURCHASE: 'First purchase',
  MONEY_OFF: 'Money off',
  FREE_SHIPPING: 'Free shipping',
};

export const attributesOption = [
  RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
  RULES_ATTRIBUTES?.ACCOUNT_CREATION,
  RULES_ATTRIBUTES?.PRODUCT_QTY,
  RULES_ATTRIBUTES?.NO_OF_VISITS,
  RULES_ATTRIBUTES?.BIRTHDAY,
  RULES_ATTRIBUTES?.FIRST_PURCHASE,
  RULES_ATTRIBUTES?.MONEY_OFF,
  RULES_ATTRIBUTES?.FREE_SHIPPING,
];

export const dummyDropdown = ['1', '2'];

export const amountOperatorOption = [
  'Less then',
  'Greater then',
  'Equal to',
  'Less then or equal to',
  'Greater then and equal to',
];
export const accountCreatedInOption = [
  'This week',
  'Last week',
  'This month',
  'Last month',
  'Custom month',
  'Custom date',
];
export const upsertRulesFormFieldsDynamic = [
  {
    id: 10,
    componentProps: {
      name: 'percentageOff',
      label: 'Percentage Off',
      placeholder: '',
    },
    attributeType: [RULES_ATTRIBUTES?.MONEY_OFF],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 11,
    componentProps: {
      name: 'flatOff',
      label: 'Flat off (on entire purchase)',
      placeholder: '',
    },
    attributeType: [RULES_ATTRIBUTES?.MONEY_OFF],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'accountCreatedIn',
      label: 'Account created in',
      placeholder: 'Select',
      options: accountCreatedInOption,
    },
    attributeType: [RULES_ATTRIBUTES?.ACCOUNT_CREATION],
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 1,
    componentProps: {
      name: 'addAmount',
      label: RULES_ATTRIBUTES?.FREE_SHIPPING
        ? 'Add purchase amount'
        : 'Add Amount',
      placeholder: 'operator',
      options: amountOperatorOption,
    },
    attributeType: [
      RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      RULES_ATTRIBUTES?.PRODUCT_QTY,
      RULES_ATTRIBUTES?.NO_OF_VISITS,
      RULES_ATTRIBUTES?.FREE_SHIPPING,
    ],
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: 'amount',
      label: '\u00a0\u00a0',
      placeholder: '00',
      type: 'number',
    },
    attributeType: [
      RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      RULES_ATTRIBUTES?.PRODUCT_QTY,
      RULES_ATTRIBUTES?.NO_OF_VISITS,
    ],
    component: RHFTextField,
    md: 6,
  },
  {
    id: 9,
    componentProps: {
      name: 'shippingFee',
      label: 'Shipping fee',
      placeholder: '',
    },
    attributeType: [RULES_ATTRIBUTES?.FREE_SHIPPING],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'timeSpanOf',
      label: 'Time span of',
      placeholder: 'Select',
      options: accountCreatedInOption,
    },
    attributeType: [RULES_ATTRIBUTES?.NO_OF_VISITS, RULES_ATTRIBUTES?.BIRTHDAY],
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'discount',
      label: 'Give discount',
      placeholder: '',
    },
    attributeType: [
      RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      RULES_ATTRIBUTES?.ACCOUNT_CREATION,
      RULES_ATTRIBUTES?.PRODUCT_QTY,
      RULES_ATTRIBUTES?.NO_OF_VISITS,
      RULES_ATTRIBUTES?.BIRTHDAY,
      RULES_ATTRIBUTES?.FIRST_PURCHASE,
    ],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'awardpoints',
      label: 'Award points',
      placeholder: '',
    },
    attributeType: [
      RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      RULES_ATTRIBUTES?.ACCOUNT_CREATION,
      RULES_ATTRIBUTES?.PRODUCT_QTY,
      RULES_ATTRIBUTES?.NO_OF_VISITS,
      RULES_ATTRIBUTES?.BIRTHDAY,
      RULES_ATTRIBUTES?.FIRST_PURCHASE,
    ],
    component: RHFTextField,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'appliedTo',
      label: 'Applied to',
      placeholder: 'Select',
      options: dummyDropdown,
    },
    attributeType: [
      RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      RULES_ATTRIBUTES?.ACCOUNT_CREATION,
      RULES_ATTRIBUTES?.NO_OF_VISITS,
      RULES_ATTRIBUTES?.BIRTHDAY,
      RULES_ATTRIBUTES?.FIRST_PURCHASE,
      RULES_ATTRIBUTES?.MONEY_OFF,
      RULES_ATTRIBUTES?.FREE_SHIPPING,
    ],
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Placeholder',
      multiline: true,
      minRows: 3,
    },
    attributeType: [
      RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      RULES_ATTRIBUTES?.ACCOUNT_CREATION,
      RULES_ATTRIBUTES?.PRODUCT_QTY,
      RULES_ATTRIBUTES?.NO_OF_VISITS,
      RULES_ATTRIBUTES?.BIRTHDAY,
      RULES_ATTRIBUTES?.FIRST_PURCHASE,
      RULES_ATTRIBUTES?.MONEY_OFF,
      RULES_ATTRIBUTES?.FREE_SHIPPING,
    ],
    component: RHFTextField,
    md: 12,
  },
];
