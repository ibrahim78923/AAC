import { RHFAutocompleteAsync } from '@/components/ReactHookForm';

import RHFTextField from '@/components/ReactHookForm/RHFTextField';
import {
  useLazyGetAllCampaignsListQuery,
  useLazyGetAllTemplateListQuery,
} from '@/services/common-APIs';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  // recipients: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = (getIsPhoneConnected: any) => {
  return {
    senderId: getIsPhoneConnected?.data?.phoneNumber,
    campaignId: null,
    templateId: null,
    recipients: '',
    detail: '',
  };
};

export const createBroadcast = () => {
  const campaignsList = useLazyGetAllCampaignsListQuery();
  const templateList = useLazyGetAllTemplateListQuery();

  return [
    {
      componentProps: {
        name: 'senderId',
        label: 'Sender',
        disabled: true,
        placeholder: 'Sender',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      title: 'Compaign',
      componentProps: {
        placeholder: 'Select campaign',
        name: 'campaignId',
        label: 'Compaign',
        apiQuery: campaignsList,
        getOptionLabel: (option: any) => option?.title,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      title: 'useTemplate',
      componentProps: {
        placeholder: 'Select template',
        name: 'templateId',
        label: 'Use Template (Optional)',
        apiQuery: templateList,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'recipients',
        label: 'Recipients',
        placeholder: 'Select recipients',
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'detail',
        label: 'Details',
        placeholder: 'Enter details..',
        multiline: true,
        rows: 6,
      },
      component: RHFTextField,
      md: 12,
    },
  ];
};

export const contactsColumns: any = [
  {
    accessorFn: (row: any) => `${row?.firstName} ${row?.lastName}`,
    id: 'name',
    isSortable: false,
    header: 'Name',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.phoneNumber,
    id: 'phoneNo',
    isSortable: false,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
];
