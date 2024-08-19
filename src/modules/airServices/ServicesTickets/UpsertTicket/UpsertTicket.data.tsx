import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDesktopDateTimePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
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
import { Box, Typography } from '@mui/material';
import { ROLES } from '@/constants/strings';
import { PAGINATION } from '@/config';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { NextRouter } from 'next/router';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { pxToRem } from '@/utils/getFontValue';

export const upsertTicketValidationSchema = (ticketId?: string, form?: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    requester: Yup?.mixed()?.nullable()?.required('Requester is required'),
    subject: Yup?.string()?.trim()?.required('Subject is required'),
    description: Yup?.string()
      ?.trim()
      ?.required('Description is Required')
      ?.test('is-not-empty', 'Description is Required', (value) => {
        const strippedContent = value?.replace(/<[^>]*>/g, '')?.trim();
        return strippedContent !== '';
      }),
    category: Yup?.mixed()?.nullable(),
    ...(!!!ticketId
      ? {
          status: Yup?.mixed()?.nullable()?.required('Status is required'),
          priority: Yup?.mixed()?.nullable()?.required('Priority is Required'),
        }
      : {}),
    department: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    plannedStartDate: Yup?.date(),
    plannedStartTime: Yup?.date()?.nullable(),
    plannedEndDate: Yup?.date()?.nullable(),
    plannedEndTime: Yup?.date()?.nullable(),
    plannedEffort: Yup?.string()?.trim(),
    associatesAssets: Yup?.mixed()?.nullable(),
    attachFile: Yup?.mixed()?.nullable(),
    ...formSchema,
  });
};

export const upsertTicketDefaultValuesFunction = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    requester: data?.requesterDetails ?? null,
    subject: data?.subject ?? '',
    description: data?.description ?? '',
    category: data?.categoryDetails ?? null,
    status: data?.status ? { _id: data?.status, label: data?.status } : null,
    priority: data?.pirority
      ? { _id: data?.pirority, label: data?.pirority }
      : null,
    department: data?.departmentDetails ?? null,
    source: data?.source ? { _id: data?.source, label: data?.source } : null,
    impact: data?.impact ? { _id: data?.impact, label: data?.impact } : null,
    agent: data?.agentDetails ?? null,
    plannedStartDate: data?.plannedStartDate
      ? new Date(data?.plannedStartDate)
      : new Date(),
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
    associatesAssets: !!data?.associateAssets?.length
      ? data?.associateAssetsDetails
      : [],
    attachFile: null,
    ...initialValues,
  };
};
export const upsertTicketFormFieldsDynamic = (
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryAgent?: any,
  apiQueryCategory?: any,
  apiQueryAssociateAsset?: any,
  router?: NextRouter,
  ticketId?: string,
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
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_REQUESTER,
      },
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
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
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },

  ...(!!!ticketId
    ? [
        {
          id: 4,
          componentProps: {
            name: 'category',
            label: 'Category',
            fullWidth: true,
            apiQuery: apiQueryCategory,
            placeholder: 'Choose Category',
            getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
              option?.categoryName,
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
            options: ticketStatusOptions,
            getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
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
            options: ticketPriorityOptions,
            getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
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
            options: ticketSourceOptions,
            getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
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
            options: ticketImpactOptions,
            getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
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
            externalParams: {
              limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
              role: ROLES?.ORG_EMPLOYEE,
            },
            getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
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
            ampm: false,
          },
          component: RHFDesktopDateTimePicker,
          md: 12,
        },
        {
          id: 13,
          componentProps: {
            name: 'plannedEndDate',
            label: 'Planned End Date',
            fullWidth: true,
            disablePast: true,
            ampm: false,
            textFieldProps: { readOnly: true },
          },
          component: RHFDesktopDateTimePicker,
          md: 12,
        },
        {
          id: 15,
          componentProps: {
            name: 'plannedEffort',
            label: 'Planned Effort',
            fullWidth: true,
            multiple: true,
            placeholder: 'Eg: 1h10m',
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
            externalParams: { limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT },
            getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
              option?.displayName,
            renderOption: (option: any) => (
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}
              >
                <Box>
                  <Typography
                    variant={'body2'}
                    color={'grey.600'}
                    fontWeight={500}
                  >
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
      ]
    : []),
  {
    id: 17,
    componentProps: {
      name: 'attachFile',
      fullWidth: true,
    },
    component: RHFDropZone,
  },
];
