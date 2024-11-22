import { RHFDateTimePicker, RHFTextField } from '@/components/ReactHookForm';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { localeDateTime } from '@/lib/date-time';

export const consumerFormFieldDefaultValues = (data: any) => ({
  firstName: data?.firstName ?? '',
  lastName: data?.lastName ?? '',
  address: data?.address ?? '',
  email: data?.email ?? '',
  previousPointsBalance: data?.previousPointsBalance ?? 0,
  currentPointBalance: data?.currentPointBalance ?? 0,
  numberofTransactions: data?.numberofTransactions ?? 0,
  firstPointsReceptionDate: data?.firstPointsReceptionDate
    ? localeDateTime(data?.firstPointsReceptionDate)
    : null,
  lastTransactionDate: data?.lastTransactionDate
    ? localeDateTime(data?.lastTransactionDate)
    : null,
  totalPointsEarned: data?.totalPointsEarned ?? 0,
  status: data?.status ?? '',
  phoneNumber: data?.phoneNumber ?? '',
  tier: data?.tier ?? '',
});

export const upsertConsumerData: ReactHookFormFieldsI[] = [
  {
    id: 1,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'previousPointsBalance',
      label: 'Previous Points Balance',
      placeholder: 'Previous Points Balance',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'currentPointBalance',
      label: 'Current Points Balance',
      placeholder: 'Current Points Balance',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    id: 7,
    componentProps: {
      name: 'numberofTransactions',
      label: 'Number Of Transactions',
      placeholder: 'Number Of Transactions',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      name: 'firstPointsReceptionDate',
      label: 'First Point Reception Date',
      placeholder: 'First Point Reception Date',
    },
    component: RHFDateTimePicker,
  },
  {
    id: 9,
    componentProps: {
      name: 'lastTransactionDate',
      label: 'Last Transaction Date',
      placeholder: 'Last Transaction Date',
    },
    component: RHFDateTimePicker,
  },
  {
    id: 10,
    componentProps: {
      name: 'totalPointsEarned',
      label: 'Total Points Received',
      placeholder: 'Total Points Received',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    id: 11,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Status',
    },
    component: RHFTextField,
  },
  {
    id: 12,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    id: 13,
    componentProps: {
      name: 'tier',
      label: 'Tier',
      placeholder: 'Tier',
    },
    component: RHFTextField,
  },
];
