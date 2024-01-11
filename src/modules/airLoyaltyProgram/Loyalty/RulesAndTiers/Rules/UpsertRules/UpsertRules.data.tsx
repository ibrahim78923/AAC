import {
  RHFAutocomplete,
  RHFDateRangePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

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

export const validationAttributes = [
  RULES_ATTRIBUTES?.MONEY_OFF,
  RULES_ATTRIBUTES?.FREE_SHIPPING,
];

export const upsertRulesFormValidationSchema = Yup?.object()?.shape(
  {
    attribute: Yup?.string(),
    description: Yup?.string()?.trim()?.max(100, 'maximum 100 characters only'),
    discount: Yup?.string()
      ?.nullable()
      ?.when(['attribute', 'awardPoints'], {
        is: (attribute: any, awardPoints: any) =>
          !validationAttributes?.includes(attribute) && awardPoints === '',
        // then: (schema: any) =>
        //   schema?.required(
        //     'Either discount or award point or both are required',
        //   ),
        otherwise: (schema) => schema?.notRequired(),
      }),
    awardPoints: Yup?.string()
      ?.nullable()
      ?.when(['attribute', 'discount'], {
        is: (attribute: any, discount: any) =>
          !validationAttributes?.includes(attribute) && discount === '',
        // then: (schema: any) =>
        //   schema?.required(
        //     'Either discount or award point or both are required',
        //   ),
        otherwise: (schema) => schema?.notRequired(),
      }),
    percentageOff: Yup?.string()?.when(['attribute', 'flatOff'], {
      is: (attribute: any, flatOff: any) =>
        attribute === RULES_ATTRIBUTES?.MONEY_OFF && flatOff === '',
      then: (schema: any) =>
        schema?.required(
          'Either percentageOff or flatOff or both are required',
        ),
      otherwise: (schema) => schema?.notRequired(),
    }),
    flatOff: Yup?.string()?.when(['attribute', 'percentageOff'], {
      is: (attribute: any, percentageOff: any) =>
        attribute === RULES_ATTRIBUTES?.MONEY_OFF && percentageOff === '',
      then: (schema: any) =>
        schema?.required(
          'Either percentageOff or flatOff or both are required',
        ),
      otherwise: (schema) => schema?.notRequired(),
    }),
  },
  [
    ['attribute', 'awardPoints'],
    ['attribute', 'discount'],
    ['awardPoints', 'discount'],
    ['discount', 'awardPoints'],
    ['attribute', 'percentageOff'],
    ['attribute', 'flatOff'],
    ['flatOff', 'percentageOff'],
    ['percentageOff', 'flatOff'],
  ],
);

export const tiersListsDropdown = ['Base', 'Bronze', 'Gold', 'Silver'];

export const amountOperatorOption = [
  'Less then',
  'Greater then',
  'Equal to',
  'Less then or equal to',
  'Greater then and equal to',
];

export const upsertRulesFormDefaultValues = {
  attribute: '',
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
  discount: '',
  percentageOff: '',
  flatOff: '',
  organizationNumber: [],
};

export const upsertRulesFormFieldsDynamic = (onChangeCustom: any) => [
  {
    id: 10,
    componentProps: {
      name: 'percentageOff',
      label: 'Percentage Off',
      placeholder: 'Enter percentage off',
      onChange: (e: any) => onChangeCustom?.(e, 'percentageOff', 'flatOff'),
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
      placeholder: 'Enter flat off',
      onChange: (e: any) => onChangeCustom?.(e, 'flatOff', 'percentageOff'),
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
    },
    attributeType: [RULES_ATTRIBUTES?.ACCOUNT_CREATION],
    component: RHFDateRangePicker,
    md: 12,
  },
  {
    id: 1,
    componentProps: {
      name: 'addAmount',
      label: RULES_ATTRIBUTES?.FREE_SHIPPING
        ? 'Add purchase amount'
        : 'Add Amount',
      placeholder: 'Enter operator',
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
      placeholder: 'Enter amount',
      type: 'number',
    },
    attributeType: [
      RULES_ATTRIBUTES?.PURCHASE_AMOUNT,
      RULES_ATTRIBUTES?.PRODUCT_QTY,
      RULES_ATTRIBUTES?.NO_OF_VISITS,
      RULES_ATTRIBUTES?.FREE_SHIPPING,
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
    },
    attributeType: [RULES_ATTRIBUTES?.NO_OF_VISITS, RULES_ATTRIBUTES?.BIRTHDAY],
    component: RHFDateRangePicker,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'discount',
      label: 'Give discount',
      placeholder: 'Enter discount',
      onChange: (e: any) => onChangeCustom?.(e, 'discount', 'awardPoints'),
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
      name: 'awardPoints',
      label: 'Award points',
      placeholder: 'Enter award points',
      onChange: (e: any) => onChangeCustom?.(e, 'awardPoints', 'discount'),
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
      options: tiersListsDropdown,
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
      placeholder: 'Enter description',
      multiline: true,
      minRows: 4,
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
