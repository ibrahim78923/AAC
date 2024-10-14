import { RHFTextField } from '@/components/ReactHookForm';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const consumerFormFieldDefaultValues = () => {
  return {
    firstName: 'John',
    lastName: 'John',
    address: 'John',
    email: 'John',
    previousPointsBalance: 'John',
    currentPointsBalance: 'John',
    numbersOfTransactions: 'John',
    firstPointsReceptionDate: 'John',
    lastTransactionDate: 'John',
    totalPointsReceived: 'John',
    status: 'John',
    phone: 'John',
    tier: 'John',
  };
};
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
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'previousPointsBalance',
      label: 'PreviousPointsBalance',
      placeholder: 'PreviousPointsBalance',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'currentPointsBalance',
      label: 'Current points balance',
      placeholder: 'Current points balance',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'numbersOfTransactions',
      label: 'Numbers Of Transactions',
      placeholder: 'Numbers of transactions',
    },
    component: RHFTextField,
  },
  {
    id: 7,
    componentProps: {
      name: 'firstPointsReceptionDate',
      label: 'FirstPointsReceptionDate',
      placeholder: 'First points receptionDate',
    },
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      name: 'lastTransactionDate',
      label: 'LastTransactionDate',
      placeholder: 'Last transaction date',
    },
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      name: 'totalPointsReceived',
      label: 'TotalPointsReceived',
      placeholder: 'Total points received',
    },
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Status',
    },
    component: RHFTextField,
  },
  {
    id: 11,
    componentProps: {
      name: 'phone',
      label: 'Phone Number',
      placeholder: 'Phone number',
    },
    component: RHFTextField,
  },
  {
    id: 12,
    componentProps: {
      name: 'tier',
      label: 'Tier',
    },
    component: RHFTextField,
  },
];
