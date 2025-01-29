import {
  RHFAutocomplete,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import { optionsIndustry, optionsType } from '../Companies.data';
import { ContactOwnerDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/ContactOwnerDropdown';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';

export const getDefaultValues = (data: any) => {
  return {
    domain: data?.domain ?? '',
    name: data?.name ?? '',
    ownerId: data?.companyOwner ?? null,
    description: data?.description ?? '',
    industry: data?.industry ?? null,
    type: data?.type ?? null,
    city: data?.city ?? '',
    postalCode: data?.postalCode ?? '',
    address: data?.address ?? '',
    noOfEmloyee: data?.noOfEmloyee ?? null,
    totalRevenue: data?.totalRevenue ?? null,
    linkedInUrl: data?.linkedInUrl ?? '',
  };
};

export const viewCompanyFormFieldsDynamic = (attachment: any) => [
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
      name: 'fileUrl',
      label: ' Profile Picture',
      isPreviewMode: true,
      fullWidth: true,
      attachmentPreviewDetail: {
        fileUrl: attachment?.url,
        orignalName: !!attachment?.url ? ' ' : 'No image found',
      },
      accept: {
        'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
        'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
      },
    },
    component: RHFDropZone,
    md: 12,
  },
  {
    _id: 4,
    componentProps: {
      getOptionLabel: (option: any) => option?.name,
    },
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
      placeholder: 'https://www.linkedin.com/',
    },
    component: RHFTextField,
  },
];
