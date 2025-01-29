import { RHFAutocompleteAsync, RHFEditor } from '@/components/ReactHookForm';
import RHFTextField from '@/components/ReactHookForm/RHFTextField';
import { STATUS_CONTANTS } from '@/constants/strings';
import {
  useLazyGetAllCampaignsListQuery,
  useLazyGetAllTemplateListQuery,
} from '@/services/common-APIs';
import { getActiveAccountSession } from '@/utils';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const validationSchema = (
  isScheduled: boolean,
  form: any,
  status?: string,
) => {
  if (status === STATUS_CONTANTS?.DRAFT) {
    return Yup.object().shape({});
  }

  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup.object().shape({
    name: Yup.string().required('Field is Required'),
    campaignId: Yup.object()?.nullable().required('Field is Required'),
    detail: Yup.string().required('Field is Required'),
    schedualDate: Yup.date()
      .nullable()
      .when([], () =>
        isScheduled
          ? Yup.date().required('Field is Required')
          : Yup.date().nullable(),
      ),
    ...formSchema,
  });
};

export const defaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);
  return {
    name: data?.name ?? '',
    campaignId: data?.campaignId ?? null,
    templateId: data?.templateId ?? null,
    recipients: data?.recipients ? 'Select' : '',
    detail: data?.detail ?? '',
    attachment: data?.attachment ?? '',
    schedualDate: null,
    ...initialValues,
  };
};

export const createBroadcast = () => {
  const ActiveAccount = getActiveAccountSession();
  const campaignsList = useLazyGetAllCampaignsListQuery();
  const templateList = useLazyGetAllTemplateListQuery();

  return [
    {
      componentProps: {
        name: 'name',
        label: 'Broadcast Name',
        required: true,
        placeholder: 'Enter name',
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
        externalParams: { companyId: ActiveAccount?.company?._id },
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
        disbaled: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'detail',
        label: 'SMS Details',
        placeholder: 'Enter sms details..',
        required: true,
      },
      component: RHFEditor,
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
