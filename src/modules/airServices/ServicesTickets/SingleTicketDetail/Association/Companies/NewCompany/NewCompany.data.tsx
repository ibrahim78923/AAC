import {
  RHFAutocomplete,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import { optionsIndustry, optionsType } from '../Companies.data';
import { ContactOwnerDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/ContactOwnerDropdown';

export const formFields = [
  {
    _id: 1,
    componentProps: {
      name: 'domain',
      label: 'Company Domain Name (URL)',
      placeholder: 'domain.com',
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    componentProps: {
      name: 'name',
      label: 'Company Name',
      placeholder: 'Company Name',
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      name: 'profilePicture',
      fullWidth: true,
      fileType: 'PNG or JPG  (max 2.44 MB)',
      accept: {
        'image/png': ['.png', '.PNG'],
        'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
      },
    },
    component: RHFDropZone,
  },
  {
    _id: 4,
    component: ContactOwnerDropdown,
  },
  {
    _id: 5,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Description',
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
  },
  {
    _id: 6,
    componentProps: {
      name: 'industry',
      label: 'Industry',
      placeholder: 'Industry',
      options: optionsIndustry,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 7,
    componentProps: {
      name: 'type',
      label: 'Type',
      placeholder: 'Type',
      options: optionsType,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 8,
    componentProps: {
      name: 'city',
      label: 'City',
      placeholder: 'City',
    },
    component: RHFTextField,
  },
  {
    _id: 9,
    componentProps: {
      name: 'postalCode',
      label: 'Postal Code',
      placeholder: 'Postal Code',
    },
    component: RHFTextField,
  },
  {
    _id: 10,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
    },
    component: RHFTextField,
  },
  {
    _id: 11,
    componentProps: {
      name: 'noOfEmloyee',
      label: 'No Of Employees',
      placeholder: 'No Of Employees',
    },
    component: RHFTextField,
  },
  {
    _id: 12,
    componentProps: {
      name: 'totalRevenue',
      label: 'Annual Revenue (£)',
      placeholder: '£ 1,000',
    },
    component: RHFTextField,
  },
  {
    _id: 13,
    componentProps: {
      name: 'linkedInUrl',
      label: 'LinkedIn Company URL',
      placeholder: 'https://www.linkedin.com/company/consultancyoutfit',
    },
    component: RHFTextField,
  },
];
