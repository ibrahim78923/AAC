import {
  RHFDropZone,
  RHFTextField,
  RHFEditor,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { InputAdornment, IconButton } from '@mui/material';
import { AddPlusPrimaryIcon } from '@/assets/icons';
import {
  useLazyGetAllCampaignsListQuery,
  useLazyGetAllWhatsAppTemplateListQuery,
} from '@/services/common-APIs';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { STATUS_CONTANTS } from '@/constants/strings';

export const broadCastValidationSchema = (
  isSchedule: any,
  form: any,
  status?: any,
) => {
  if (status === STATUS_CONTANTS?.DRAFT) {
    return Yup.object().shape({});
  }

  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup.object().shape({
    name: Yup.string().required('Field is Required'),
    campaignId: Yup.object().required('Field is Required'),
    templateId: Yup.object().required('Field is Required'),
    detail: Yup.string().required('Field is Required'),
    schedualDate: Yup.date()
      .nullable()
      .when([], () =>
        isSchedule
          ? Yup.date().required('Field is Required')
          : Yup.date().nullable(),
      ),
    ...formSchema,
  });
};

export const broadcastDefaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);
  return {
    name: data?.name ?? '',
    campaignId: data?.campaignId ?? null,
    templateId: data?.templateId ?? null,
    recipients: data?.recipients ?? '',
    detail: data?.detail ?? '',
    attachment: data?.attachment ?? '',
    schedualDate: null,
    ...initialValues,
  };
};

export const createBroadcastFields = (handleOpenContactsDrawer: any) => {
  const campaignsList = useLazyGetAllCampaignsListQuery();
  const templateList = useLazyGetAllWhatsAppTemplateListQuery();
  return [
    {
      id: '01',
      componentProps: {
        label: 'Broadcast Name',
        name: 'name',
        fullWidth: true,
        placeholder: 'Enter Name',
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      title: 'Campaign',
      componentProps: {
        placeholder: 'Select campaign',
        name: 'campaignId',
        label: 'Campaign',
        required: true,
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
        label: 'Use Template',
        required: true,
        apiQuery: templateList,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      id: '04',
      componentProps: {
        name: 'recipients',
        label: 'Add Contacts',
        fullWidth: true,
        required: true,
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleOpenContactsDrawer} edge="end">
                <AddPlusPrimaryIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
        placeholder: 'Select Contacts',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      id: '05',
      component: RHFEditor,
      md: 12,
      componentProps: {
        name: 'detail',
        label: 'Details',
        fullWidth: true,
        required: true,
        disabled: true,
      },
    },
    {
      id: '06',
      component: RHFDropZone,
      md: 12,
      title: 'Attachment',
      componentProps: {
        name: 'attachment',
        label: 'Attachment',
        fullWidth: true,
        multiline: true,
        rows: '4',
      },
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
