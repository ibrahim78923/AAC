import * as Yup from 'yup';
export const keypadDefaultValue = {
  phoneNo: '',
};
export const keypadSchema = Yup?.object()?.shape({
  phoneNo: Yup?.string()
    ?.trim()
    ?.matches(/^(?:\+44|0)[1-9]\d{9}$/, 'Invalid UK Phone Number')
    ?.required('Phone Number is Required'),
});
export const keypadData = [
  [
    { number: 1, characters: 'ABC', id: 'key-1' },
    { number: 2, characters: 'DEF', id: 'key-2' },
    { number: 3, characters: 'GHI', id: 'key-3' },
  ],
  [
    { number: 4, characters: 'JKL', id: 'key-4' },
    { number: 5, characters: 'MNO', id: 'key-5' },
    { number: 6, characters: 'PQR', id: 'key-6' },
  ],
  [
    { number: 7, characters: 'STU', id: 'key-7' },
    { number: 8, characters: 'VWX', id: 'key-8' },
    { number: 9, characters: 'YZ', id: 'key-9' },
  ],
  [
    { number: '*', id: 'key-star' },
    { number: 0, characters: '+', id: 'key-0' },
    { number: '#', id: 'key-hash' },
  ],
];
