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
  tier: data?.tierDetails?.name ?? '',
});

export const upsertConsumerData: ReactHookFormFieldsI[] = [
  {
    _id: 1,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
    },
    component: RHFTextField,
  },
  {
    _id: 4,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
    },
    component: RHFTextField,
  },
  {
    _id: 5,
    componentProps: {
      name: 'previousPointsBalance',
      label: 'Previous Points Balance',
      placeholder: 'Previous Points Balance',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    _id: 6,
    componentProps: {
      name: 'currentPointBalance',
      label: 'Current Points Balance',
      placeholder: 'Current Points Balance',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    _id: 7,
    componentProps: {
      name: 'numberofTransactions',
      label: 'Number Of Transactions',
      placeholder: 'Number Of Transactions',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    _id: 8,
    componentProps: {
      name: 'firstPointsReceptionDate',
      label: 'First Point Reception Date',
      placeholder: 'First Point Reception Date',
      fullWidth: true,
    },
    component: RHFDateTimePicker,
  },
  {
    _id: 9,
    componentProps: {
      name: 'lastTransactionDate',
      label: 'Last Transaction Date',
      placeholder: 'Last Transaction Date',
      fullWidth: true,
    },
    component: RHFDateTimePicker,
  },
  {
    _id: 10,
    componentProps: {
      name: 'totalPointsEarned',
      label: 'Total Points Received',
      placeholder: 'Total Points Received',
      type: 'number',
    },
    component: RHFTextField,
  },
  {
    _id: 11,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Status',
    },
    component: RHFTextField,
  },
  {
    _id: 12,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    _id: 13,
    componentProps: {
      name: 'tier',
      label: 'Tier',
      placeholder: 'Tier',
    },
    component: RHFTextField,
  },
];
