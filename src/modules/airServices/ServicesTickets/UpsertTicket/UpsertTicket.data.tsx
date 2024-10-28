import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
  RHFDatePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../ServicesTickets.data';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { pxToRem } from '@/utils/getFontValue';
import { RequesterFieldDropdown } from '../ServiceTicketFormFields/RequesterFieldDropdown';
import { AgentFieldDropdown } from '../ServiceTicketFormFields/AgentFieldDropdown';
import { AssetFieldDropdown } from '../ServiceTicketFormFields/AssetFieldDropdown';
import { DepartmentFieldDropdown } from '../ServiceTicketFormFields/DepartmentFieldDropdown';
import { CategoryFieldDropdown } from '../ServiceTicketFormFields/CategoryFieldDropdown';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { localeDateTime } from '@/lib/date-time';

const { SERVICES_TICKETS_SUBJECT_MAX_CHARACTERS } = CHARACTERS_LIMIT ?? {};

export const upsertTicketValidationSchema = (ticketId?: string, form?: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup?.object()?.shape({
    requester: Yup?.mixed()?.nullable()?.required('Requester is required'),
    subject: Yup?.string()
      ?.trim()
      ?.required('Subject is required')
      ?.max(
        SERVICES_TICKETS_SUBJECT_MAX_CHARACTERS,
        `Maximum characters limit is ${SERVICES_TICKETS_SUBJECT_MAX_CHARACTERS}`,
      ),
    description: Yup?.string()
      ?.trim()
      ?.required('Description is required')
      ?.test('is-not-empty', 'Description is required', (value) => {
        const strippedContent = value
          ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
          ?.trim();
        return strippedContent !== '';
      }),
    category: Yup?.mixed()?.nullable(),
    ...(!!!ticketId
      ? {
          status: Yup?.mixed()?.nullable()?.required('Status is required'),
          priority: Yup?.mixed()?.nullable()?.required('Priority is required'),
          plannedEndDate: Yup?.date()
            ?.nullable()
            ?.required('Planned end date is required'),
        }
      : {}),
    department: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    plannedStartDate: Yup?.date(),
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
      ? localeDateTime(data?.plannedStartDate)
      : new Date(),
    plannedEndDate: data?.plannedEndDate
      ? localeDateTime(data?.plannedEndDate)
      : null,
    plannedEffort: data?.plannedEffort ?? '',
    associatesAssets: !!data?.associateAssets?.length
      ? data?.associateAssetsDetails
      : [],
    attachFile: null,
    ...initialValues,
  };
};
export const upsertTicketFormFieldsDynamic = (ticketId?: string) => {
  return [
    {
      id: 1,
      component: RequesterFieldDropdown,
    },
    {
      id: 2,
      componentProps: {
        name: 'subject',
        label: 'Subject',
        placeholder: 'Enter Subject',
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
        placeholder: 'Enter Description',
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
            component: CategoryFieldDropdown,
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
            component: DepartmentFieldDropdown,
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
            component: AgentFieldDropdown,
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
            md: 12,
          },
          {
            id: 13,
            componentProps: {
              name: 'plannedEndDate',
              label: 'Planned End Date',
              fullWidth: true,
              disablePast: true,
              required: true,
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
            component: AssetFieldDropdown,
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
};
