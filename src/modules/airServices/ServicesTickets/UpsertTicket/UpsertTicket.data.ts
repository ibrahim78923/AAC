import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../ServicesTickets.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';

const todayDate = dayjs()?.format(DATE_FORMAT?.UI);

export const upsertTicketValidationSchema = Yup?.object()?.shape({
  requester: Yup?.mixed()?.nullable()?.required('Required'),
  subject: Yup?.string()?.trim()?.required('Required'),
  description: Yup?.string(),
  category: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.nullable()?.required('Required'),
  priority: Yup?.mixed()?.nullable()?.required('Required'),
  department: Yup?.mixed()?.nullable(),
  source: Yup?.mixed()?.nullable(),
  impact: Yup?.mixed()?.nullable(),
  agent: Yup?.mixed()?.nullable(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date()?.nullable(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date()?.nullable(),
  plannedEffort: Yup?.string()?.trim(),
  associatesAssets: Yup?.mixed()?.nullable(),
  attachFile: Yup?.mixed()?.nullable(),
});

export const upsertTicketDefaultValuesFunction = (data?: any) => {
  return {
    requester: !!Object?.keys(data?.requesterDetails ?? {})?.length
      ? {
          name: `${data?.requesterDetails?.firstName} ${data?.requesterDetails?.firstName}`,
          _id: data?.requesterDetails?._id,
        }
      : null,
    subject: data?.subject ?? '',
    description: data?.description ?? '',
    category: data?.category ?? null,
    status: data?.status ?? null,
    priority: data?.pirority ?? null,
    department: !!Object?.keys(data?.departmentDetails ?? {})?.length
      ? {
          name: data?.departmentDetails?.name,
          _id: data?.departmentDetails?._id,
        }
      : null,
    source: data?.source ?? null,
    impact: data?.impact ?? null,
    agent: !!Object?.keys(data?.agentDetails ?? {})?.length
      ? {
          name: `${data?.agentDetails?.firstName} ${data?.agentDetails?.firstName}`,
          _id: data?.agentDetails?._id,
        }
      : null,
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),
    plannedStartTime:
      typeof data?.plannedStartDate === 'string'
        ? new Date(data?.plannedStartDate)
        : null,
    plannedEndDate: new Date(data?.plannedEndDate ?? todayDate),
    plannedEndTime:
      typeof data?.plannedEndDate === 'string'
        ? new Date(data?.plannedEndDate)
        : null,
    plannedEffort: data?.plannedEffort ?? '',
    associatesAssets: !!data?.associateAssets?.length
      ? data?.associateAssets?.map((asset: any) => ({
          name: asset?.name ?? asset,
          _id: asset?._id ?? asset,
        }))
      : [],
    attachFile: null,
  };
};
export const upsertTicketFormFieldsDynamic = (
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryAgent?: any,
  apiQueryCategory?: any,
  apiQueryAssociateAsset?: any,
  router?: any,
) => [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryRequester,
      EndIcon: AddCircleIcon,
      externalParams: { limit: 50, role: 'ORG_REQUESTER' },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      endIconClick: () => {
        router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS);
      },
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      style: { height: '250px' },
    },
    component: RHFEditor,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      apiQuery: apiQueryCategory,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Status',
      options: ticketStatusOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Priority',
      options: ticketPriorityOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      apiQuery: apiQueryDepartment,
      placeholder: 'Choose Department',
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: ticketImpactOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      externalParams: { limit: 50, role: 'ORG_AGENT' },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      multiple: true,
      placeholder: 'Eg: 1h 10m',
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      name: 'associatesAssets',
      label: 'Associate Assets',
      fullWidth: true,
      multiple: true,
      apiQuery: apiQueryAssociateAsset,
      externalParams: { limit: 50 },
      getOptionLabel: (option: any) => option?.displayName,
      placeholder: 'Choose Assets',
      EndIcon: AddCircleIcon,
      endIconSx: { color: 'primary.main' },
      endIconClick: () => {
        router?.push(AIR_SERVICES?.UPSERT_INVENTORY);
      },
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'attachFile',
      fullWidth: true,
      fileType: '',
    },
    component: RHFDropZone,
  },
];
