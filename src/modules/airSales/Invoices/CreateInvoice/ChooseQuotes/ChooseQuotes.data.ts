import * as Yup from 'yup';

export const quotesOptions = [
  { label: 'iphonePurchase', value: 'Iphone Purchase' },
  { label: 'keyboardPurchase', value: 'Keyboard Purchase' },
  { label: 'chairsForNewOffice', value: 'Chairs For New Office' },
];

export const quoteValidation = Yup?.object()?.shape({
  quotes: Yup?.string()?.required('Required'),
});
export const quoteDefaultValues = {
  quotes: '',
};
