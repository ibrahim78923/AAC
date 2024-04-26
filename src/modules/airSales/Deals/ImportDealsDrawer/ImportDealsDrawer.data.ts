import { RHFTextField } from '@/components/ReactHookForm';

export const ImportDealsData = [
  {
    fileColumn: 'Deal Name',
    subTitle: 'sample deal 1',
    componentProps: {
      name: 'owner',
      label: 'Date',
      select: true,
    },
    options: [
      { label: 'Mandatory Fileds', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
  },
  {
    fileColumn: 'Amount',
    subTitle: '1000',
    componentProps: {
      name: 'type',
      label: 'Deal Value',
      select: true,
    },
    options: [
      { label: 'Mandatory Fields', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
  },
  {
    fileColumn: 'Deal Stage',
    subTitle: 'Lost',
    componentProps: {
      name: 'expectedCloseDate',
      label: 'Deal Stage',
      select: true,
    },
    options: [
      { label: 'Mandatory Fields', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
  },
  {
    fileColumn: 'Deal Pipeline',
    subTitle: 'Janesampleton@gmail.com',
    componentProps: {
      name: 'closeDate',
      label: 'Deal Pipeline',
      select: true,
    },
    options: [
      { label: 'Mandatory Fields', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
  },
  {
    fileColumn: 'Owner(EmailAddress)',
    subTitle: 'Janesampleton@gmailcom',
    componentProps: {
      name: 'paymentStatus',
      label: 'Sales owner',
      select: true,
    },
    options: [
      { label: 'Mandatory Fields', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
  },
  {
    fileColumn: 'Type',
    subTitle: 'New Business',
    componentProps: {
      name: 'probability',
      label: 'choose value',
      select: true,
    },
    options: [
      { label: 'Mandatory Fields', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
  },
  {
    fileColumn: 'Close Date',
    subTitle: '1/02/2022',

    componentProps: {
      name: 'accountName',
      label: 'Choose Value',
      select: true,
    },
    options: [
      { label: 'Mandatory Fields', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
  },
  {
    fileColumn: 'Related contact email address',
    subTitle: 'Janesampleton2@gmailcom',
    componentProps: {
      name: 'emailAddress',
      label: 'Choose Value',
      select: true,
    },
    options: [
      { label: 'Mandatory Fields', value: 'Mandatory Fields' },
      { label: 'Date', value: 'Date' },
      { label: 'Amount', value: 'Amount' },
      { label: 'optional Fields', value: 'optional Fields' },
      { label: 'Related Fields', value: 'Related Fields' },
    ],
    component: RHFTextField,
  },
];
