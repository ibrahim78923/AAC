import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import { ContactOwnerContactDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/ContactOwnerContactDropdown';
import { ContactsStatusDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/ContactsStatusDropdown';
import { LifeCycleStageDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/LifeCycleStageDropdown';

export const getDefaultValues = (data: any) => {
  return {
    email: data?.email ?? '',
    firstName: data?.firstName ?? '',
    lastName: data?.lastName ?? '',
    address: data?.address ?? '',
    dateOfBirth: new Date(data?.dateOfBirth) ?? null,
    phoneNumber: data?.phoneNumber ?? '',
    whatsAppNumber: data?.whatsAppNumber ?? '',
    jobTitle: data?.jobTitle ?? '',
    dateOfJoining: new Date(data?.dateOfJoining) ?? null,
    contactOwnerId: data?.ownerData?.[ARRAY_INDEX?.ZERO] ?? null,
    lifeCycleStageId: data?.lifeCycleStageData?.[ARRAY_INDEX?.ZERO] ?? null,
    statusId: data?.statusData?.[ARRAY_INDEX?.ZERO] ?? null,
  };
};

export const formFields = [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      required: true,
    },
    component: RHFTextField,
  },
  { id: 2 },
  {
    id: 3,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'John',
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Doe',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'dateOfBirth',
      label: 'Date Of Birth',
      fullWidth: true,
      disableFuture: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 7,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      name: 'whatsAppNumber',
      label: 'WhatsApp Number',
      placeholder: 'WhatsApp Number',
    },
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'Job Title',
    },
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      name: 'dateOfJoining',
      label: 'Date Of Joining',
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 11,
    component: ContactOwnerContactDropdown,
  },
  {
    id: 12,
    component: LifeCycleStageDropdown,
  },
  {
    id: 13,
    component: ContactsStatusDropdown,
  },
];
