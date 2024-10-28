import { Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../Tickets.data';
import { DATE_FORMAT } from '@/constants';
import { FILE_MAX_SIZE } from '@/config';

const todayDate = dayjs()?.format(DATE_FORMAT?.UI);

export const ticketValidationSchema = () => {
  return Yup?.object()?.shape({
    requester: Yup?.mixed()?.nullable()?.required('Requester is required'),
    subject: Yup?.string()?.trim()?.required('Subject is required'),
    description: Yup?.string()?.trim()?.required('Description is Required'),
    category: Yup?.mixed()?.nullable(),
    status: Yup?.mixed()?.nullable()?.required('Status is required'),
    pirority: Yup?.mixed()?.nullable()?.required('Priority is Required'),

    department: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    plannedStartDate: Yup?.date(),
    plannedStartTime: Yup?.date()?.nullable(),
    plannedEndDate: Yup?.date()?.nullable(),
    plannedEndTime: Yup?.date()?.nullable(),
    plannedEffort: Yup?.string()?.trim(),
    associateAssets: Yup?.mixed()?.nullable(),
    fileUrl: Yup?.mixed()?.nullable(),
  });
};

export const ticketDefaultValuesFunction = (data?: any) => {
  return {
    requester: data?.requesterDetails ?? null,
    subject: data?.subject ?? '',
    description: data?.description ?? '',
    category: data?.category ?? null,
    status: data?.status ? { _id: data?.status, label: data?.status } : null,
    pirority: data?.pirority
      ? { _id: data?.pirority, label: data?.pirority }
      : null,
    department: data?.departmentDetails ?? null,
    source: data?.source ? { _id: data?.source, label: data?.source } : null,
    impact: data?.impact ? { _id: data?.impact, label: data?.impact } : null,
    agent: data?.agentDetails ?? null,
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),
    plannedStartTime:
      typeof data?.plannedStartDate === 'string'
        ? new Date(data?.plannedStartDate)
        : new Date(),
    plannedEndDate:
      typeof data?.plannedEndDate === 'string'
        ? new Date(data?.plannedEndDate)
        : null,
    plannedEndTime:
      typeof data?.plannedEndDate === 'string'
        ? new Date(data?.plannedEndDate)
        : null,
    plannedEffort: data?.plannedEffort ?? '',
    associateAssets: !!data?.associateAssets?.length
      ? data?.associateAssetsDetails
      : [],
    fileUrl: null,
  };
};

export const ticketFormFieldsDynamic = (
  productId: string,
  companyId: string,
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryAgent?: any,
  apiQueryCategory?: any,
  apiQueryAssociateAsset?: any,
  disabledField?: boolean,
) => [
  {
    id: 'requester',
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryRequester,
      externalParams: {
        requester: true,
        admin: true,
        productId,
      },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      placeholder: 'Add Requester',
      disabled: disabledField,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 'subject',
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
      required: true,
      disabled: disabledField,
    },
    component: RHFTextField,
  },
  {
    id: 'description',
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: '250px' },
      disabled: disabledField,
    },
    component: RHFEditor,
  },
  {
    id: 'category',
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      apiQuery: apiQueryCategory,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
      disabled: disabledField,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 'status',
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Status',
      options: ticketStatusOptions,
      getOptionLabel: (option: any) => option?.label,
      disabled: disabledField,
    },
    component: RHFAutocomplete,
  },
  {
    id: 'pirority',
    componentProps: {
      name: 'pirority',
      label: 'Priority',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Priority',
      options: ticketPriorityOptions,
      getOptionLabel: (option: any) => option?.label,
      disabled: disabledField,
    },
    component: RHFAutocomplete,
  },
  {
    id: 'department',
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      apiQuery: apiQueryDepartment,
      placeholder: 'Choose Department',
      disabled: disabledField,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 'source',
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: any) => option?.label,
      disabled: disabledField,
    },
    component: RHFAutocomplete,
  },
  {
    id: 'impact',
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: ticketImpactOptions,
      getOptionLabel: (option: any) => option?.label,
      disabled: disabledField,
    },
    component: RHFAutocomplete,
  },
  {
    id: 'agent',
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      externalParams: {
        admin: true,
        productId,
      },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      disabled: disabledField,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 'plannedStartDate',
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
    id: 'plannedStartTime',
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
    id: 'plannedEndDate',
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      textFieldProps: { readOnly: true },
      disabled: disabledField,
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    id: 'plannedEndTime',
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
      ampm: false,
      textFieldProps: { readOnly: true },
      disabled: disabledField,
    },
    component: RHFTimePicker,
    md: 4.5,
  },
  {
    id: 'plannedEffort',
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      multiple: true,
      placeholder: 'Eg: 1h10m',
      disabled: disabledField,
    },
    component: RHFTextField,
  },
  {
    id: 'associateAssets',
    componentProps: {
      name: 'associateAssets',
      label: 'Associate Assets',
      fullWidth: true,
      multiple: true,
      apiQuery: apiQueryAssociateAsset,
      externalParams: { companyId },
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
      disabled: disabledField,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 'fileUrl',
    componentProps: {
      name: 'fileUrl',
      fullWidth: true,
      fileType: 'PNG or JPG  (max 2.44 MB)',
      maxSize: FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE,
      accept: {
        'image/*': ['.png', '.jpg'],
      },
      disabled: disabledField,
    },
    component: RHFDropZone,
  },
];

export const existingTicketValidationSchema = Yup?.object()?.shape({
  ticketId: Yup?.mixed()?.nullable()?.required('Field is Required'),
});

export const existingTicketDefaultValues = {
  ticketId: null,
};

export const existingTicketDataArray = (ticketsList: any) => [
  {
    id: 'ticketId',
    component: RHFAutocompleteAsync,
    md: 12,
    componentProps: {
      name: 'ticketId',
      label: 'Select Ticket',
      placeholder: 'Select Ticket',
      apiQuery: ticketsList,
      getOptionLabel: (option: any) => option?.ticketIdNumber,
      externalParams: { metaData: false },
      required: true,
    },
  },
];

export const FORM_TYPE = {
  NEW: 'new',
  EXISTING: 'existing',
};
