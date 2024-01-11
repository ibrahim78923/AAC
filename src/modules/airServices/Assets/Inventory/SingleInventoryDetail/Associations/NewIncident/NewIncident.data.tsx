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

import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  TICKET_IMPACT,
  TICKET_PRIORITY,
  TICKET_STATUS,
} from '@/constants/strings';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { Box, Typography } from '@mui/material';

const todayDate = dayjs()?.format(DATE_FORMAT?.UI);

const incidentStatusOptions = [
  {
    _id: TICKET_STATUS?.OPEN,
    label: TICKET_STATUS?.OPEN,
  },
  {
    _id: TICKET_STATUS?.PENDING,
    label: TICKET_STATUS?.PENDING,
  },
  {
    _id: TICKET_STATUS?.RESOLVED,
    label: TICKET_STATUS?.RESOLVED,
  },
  {
    _id: TICKET_STATUS?.CLOSED,
    label: TICKET_STATUS?.CLOSED,
  },
];
const incidentPriorityOptions = [
  TICKET_PRIORITY?.LOW,
  TICKET_PRIORITY?.MEDIUM,
  TICKET_PRIORITY?.HIGH,
  TICKET_PRIORITY?.URGENT,
];

const incidentImpactOptions = [
  TICKET_IMPACT?.LOW,
  TICKET_IMPACT?.MEDIUM,
  TICKET_IMPACT?.HIGH,
];

const incidentSourceOptions = ['PHONE', 'EMAIL', 'PORTAL', 'CHAT'];

export const newIncidentValidationSchema = Yup?.object()?.shape({
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
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.string()?.trim(),
  associatesAssets: Yup?.mixed()?.nullable(),
  attachFile: Yup?.mixed()?.nullable(),
});

export const newIncidentsDefaultValuesFunction = (data?: any) => {
  return {
    requester: data?.requester ?? null,
    subject: data?.subject ?? '',
    description: data?.description ?? '',
    category: data?.category ?? null,
    status: data?.status ?? null,
    priority: data?.priority ?? null,
    department: data?.department ?? null,
    source: data?.source ?? null,
    impact: data?.impact ?? null,
    agent: data?.agent ?? null,
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),
    plannedStartTime: new Date(),
    plannedEndDate: new Date(data?.plannedEndDate ?? todayDate),
    plannedEndTime: new Date(),
    plannedEffort: !!data?.plannedEffort?.length ? data?.plannedEffort : '',
    associatesAssets: !!data?.associatesAsset?.length
      ? data?.associatesAsset
      : [],
    attachFile: null,
  };
};

export const newIncidentFormFieldsDynamic = (
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryAgent?: any,
  apiQueryCategory?: any,
  apiQueryAssociateAsset?: any,
  router?: any,
) => [
  {
    id: 1,
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
    id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: '250px' },
    },
    component: RHFEditor,
  },
  {
    id: 4,
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
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Status',
      options: incidentStatusOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Priority',
      options: incidentPriorityOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
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
    id: 8,
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      placeholder: 'Choose Source',
      options: incidentSourceOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 9,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: incidentImpactOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 10,
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
    id: 11,
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
      disabled: true,
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    id: 12,
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTimePicker,
    md: 4.5,
  },
  {
    id: 13,
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      textFieldProps: { readOnly: true },
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    id: 14,
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4.5,
  },
  {
    id: 15,
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
    id: 16,
    componentProps: {
      name: 'associatesAssets',
      label: 'Associate Assets',
      fullWidth: true,
      multiple: true,
      apiQuery: apiQueryAssociateAsset,
      externalParams: { limit: 50 },
      getOptionLabel: (option: any) => option?.displayName,
      renderOption: (option: any) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box>
            <Typography variant={'body2'} color={'grey.600'} fontWeight={500}>
              {option?.displayName}
            </Typography>
            <Typography variant={'body4'} color={'grey.900'}>
              {option?.assetType}
            </Typography>
          </Box>
          <Typography variant={'body4'} color={'grey.900'}>
            EOL:
            {dayjs(option?.assetLifeExpiry)?.format(DATE_FORMAT?.UI) ??
              dayjs(new Date())?.format(DATE_FORMAT?.UI)}
          </Typography>
        </Box>
      ),
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
    id: 17,
    componentProps: {
      name: 'attachFile',
      fullWidth: true,
      fileType: 'PNG or JPG  (max 2.44 MB)',
      maxSize: 1024 * 1024 * 2.44,
      accept: {
        'image/*': ['.png', '.jpg'],
      },
    },
    component: RHFDropZone,
  },
];
