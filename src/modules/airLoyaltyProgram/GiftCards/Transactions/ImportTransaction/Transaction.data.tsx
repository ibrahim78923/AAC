import { FIELD_TYPES } from '@/constants/strings';

export const CRM_COLUMNS_GIFT_CARD_TRANSACTION = [
  {
    _id: 'add',
    label: 'Add',
    groupBy: FIELD_TYPES?.MANDATORY_FIELD,
  },
  {
    _id: 'amount',
    label: 'Amount',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
  { _id: 'shop', label: 'Shop', groupBy: FIELD_TYPES?.OPTIONAL_FIELD },
  {
    _id: 'noOfGiftCard',
    label: 'No. of Gift Card',
    groupBy: FIELD_TYPES?.OPTIONAL_FIELD,
  },
];
