import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

import RHFTextField from '@/components/ReactHookForm/RHFTextField';
import {
  useLazyGetAllCampaignsListQuery,
  useLazyGetAllTemplateListQuery,
} from '@/services/common-APIs';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  sender: Yup.string().required('Field is Required'),
  compaign: Yup.string().required('Field is Required'),
  useTemplate: Yup.string().required('Field is Required'),
  recipients: Yup.string().required('Field is Required'),
  // Commented for future use
  // details: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  sender: '',
  compaign: null,
  useTemplate: null,
  recipients: '',
  // Commented for future use
  // details: '',
};

export const createBroadcast = () => {
  const campaignsList = useLazyGetAllCampaignsListQuery();
  const templateList = useLazyGetAllTemplateListQuery();
  return [
    {
      title: 'Sender',
      componentProps: {
        label: 'Sender',
        name: 'sender',
        placeholder: 'Select sender',
        fullWidth: true,
        required: true,
        options: [
          '(217)555-0113',
          '(217)555-0114',
          '(217)555-0109',
          '(217)555-0115',
        ],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      title: 'Compaign',
      componentProps: {
        placeholder: 'Select campaign',
        name: 'compaign',
        label: 'Compaign',
        apiQuery: campaignsList,
        // fullWidth: true,
        getOptionLabel: (option: any) => option?.title,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },

    // {
    //   title: 'Compaign',
    //   componentProps: {
    //     label: 'Compaign',
    //     name: 'compaign',
    //     fullWidth: true,
    //     select: true,
    //     required: true,
    //   },
    //   options: [
    //     { value: 'compaign1', label: 'Compaign 1' },
    //     { value: 'compaign2', label: 'Compaign 2' },
    //     { value: 'compaign3', label: 'Compaign 3' },
    //     { value: 'compaign4', label: 'Compaign 4' },
    //   ],
    //   component: RHFSelect,
    //   md: 12,
    // },
    {
      title: 'useTemplate',
      componentProps: {
        placeholder: 'Select template',
        name: 'useTemplate',
        label: 'Use Template (Optional)',
        apiQuery: templateList,
        // fullWidth: true,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    // {
    //   title: 'useTemplate',
    //   componentProps: {
    //     label: 'Use Template (Optional)',
    //     name: 'useTemplate',
    //     fullWidth: true,
    //     select: true,
    //   },
    //   options: [
    //     { value: 'template1', label: 'Template 1' },
    //     { value: 'template2', label: 'Template 2' },
    //     { value: 'template3', label: 'Template 3' },
    //     { value: 'template4', label: 'Template 4' },
    //   ],
    //   component: RHFSelect,
    //   md: 12,
    // },
    {
      componentProps: {
        name: 'recipients',
        label: 'Recipients',
        // fullWidth: true,
        placeholder: 'Select',
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    // Commented for future use
    // {
    //   componentProps: {
    //     name: 'details',
    //     label: 'Details',
    //     fullWidth: true,
    //   },
    //   component: RHFTextField,
    //   md: 12,
    // },
  ];
};

export const contactDetails: any = [
  {
    Id: 1,
    Name: 'Jerome Bell',
    PhoneNumber: '(219) 555-0114',
  },
  {
    Id: 2,
    Name: 'Theresa Webb',
    PhoneNumber: '(219) 555-0115',
  },
];

export const contactsColumns: any = [
  {
    accessorFn: (row: any) => row?.Name,
    id: 'name',
    isSortable: false,
    header: 'Name',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.PhoneNumber,
    id: 'phoneNo',
    isSortable: false,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
];
