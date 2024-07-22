import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { COMPANITES_TYPE } from '@/constants';
import { getSession } from '@/utils';
import * as Yup from 'yup';

export const companiesValidationSchema = Yup?.object()?.shape({
  domain: Yup?.string()?.when('company', ([company]: any, field: any) =>
    company === COMPANITES_TYPE?.NEW_COMPANY
      ? field?.required('Field is required')
      : field?.optional(),
  ),
  name: Yup?.string()?.when('company', ([company]: any, field: any) =>
    company === COMPANITES_TYPE?.NEW_COMPANY
      ? field?.required('Field is required')
      : field?.optional(),
  ),
  ownerId: Yup?.object()?.when('company', ([company]: any, field: any) =>
    company === COMPANITES_TYPE?.NEW_COMPANY
      ? field?.required('Field is required')
      : field?.optional(),
  ),
});

export const companiesDefaultValues = {
  company: COMPANITES_TYPE?.NEW_COMPANY,
  domain: '',
  noOfEmloyee: '',
  totalRevenue: '',
  ownerId: null,
};

export const companiesDataArray = (getCompanyContactsList: any) => {
  const { user }: any = getSession();
  return [
    {
      componentProps: {
        name: 'domain',
        label: 'Company Domain Name (URL)',
        placeholder: 'Enter here',
        required: true,
        fullWidth: true,
        select: false,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'name',
        label: 'Company Name',
        placeholder: 'Company name',
        fullWidth: true,
        select: false,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select company owner',
        name: 'ownerId',
        label: 'Company Owner',
        required: true,
        apiQuery: getCompanyContactsList,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { contactOwnerId: user?._id },
        queryKey: 'contactOwnerId',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select industry',
        name: 'industry',
        label: 'Industry',
        options: [
          'Computer software',
          'Computer Services',
          'Construction',
          'None',
        ],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select type',
        name: 'type',
        label: 'Company Type',
        options: ['Partner', 'Vendor', 'None'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        name: 'noOfEmloyee',
        label: 'No of Employees',
        placeholder: 'Enter here',
        fullWidth: true,
      },
      md: 12,
      component: RHFTextField,
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'totalRevenue',
        label: 'Total Revenue',
        placeholder: 'Enter here',
        fullWidth: true,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'city',
        label: 'City',
        placeholder: 'Enter here',
        fullWidth: true,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'postalCode',
        label: 'Postal Code',
        placeholder: 'Enter here',
        fullWidth: true,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'address',
        label: 'Company Address',
        placeholder: 'Enter here',
        fullWidth: true,
        multiline: true,
        rows: 4,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter here',
        fullWidth: true,
        multiline: true,
        rows: 3,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'linkedInUrl',
        label: 'LinkdIn Company Page',
        placeholder: 'Enter here',
        fullWidth: true,
      },
    },
  ];
};

export const drawerTitle: any = {
  Add: 'Add companies',
  Edit: 'Edit companies',
  View: 'View companies',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};

export const companiesOptions = [
  {
    label: 'New Company',
    value: 'new-Company',
  },
  {
    label: 'Existing Company',
    value: 'existing-Company',
  },
];
