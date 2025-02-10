import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../../../ServicesTickets.data';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { pxToRem } from '@/utils/getFontValue';
import { RequesterFieldDropdown } from '../../../ServiceTicketFormFields/RequesterFieldDropdown';
import { CategoryFieldDropdown } from '../../../ServiceTicketFormFields/CategoryFieldDropdown';
import { DepartmentFieldDropdown } from '../../../ServiceTicketFormFields/DepartmentFieldDropdown';
import { AgentFieldDropdown } from '../../../ServiceTicketFormFields/AgentFieldDropdown';
import { AssetFieldDropdown } from '../../../ServiceTicketFormFields/AssetFieldDropdown';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { localeDateTime } from '@/lib/date-time';
import { formatDurationHourMinute } from '@/utils/dateTime';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';

const { SERVICES_TICKETS_SUBJECT_MAX_CHARACTERS } = CHARACTERS_LIMIT ?? {};

export const upsertTicketValidationSchema = (childTicketId: string) => {
  return Yup?.object()?.shape({
    requester: Yup?.mixed()?.nullable()?.required('Requester is required'),
    subject: Yup?.string()
      ?.trim()
      ?.required('Subject is required')
      ?.matches(REGEX?.ALPHABETS, 'Must be a string')
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
    ...(!!!childTicketId
      ? {
          status: Yup?.mixed()?.nullable()?.required('Status is required'),
          priority: Yup?.mixed()?.nullable()?.required('Priority is required'),
          plannedEndDate: Yup?.date()
            ?.nullable()
            .min(
              Yup?.ref('plannedStartDate'),
              'Planned end date is after planned start date',
            ),
        }
      : {}),
    department: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    plannedStartDate: Yup?.date()
      ?.nullable()
      ?.when('plannedEndDate', {
        is: (value: any) => value !== null,
        then: () =>
          Yup?.date()?.nullable()?.required('Planned start date is required'),
        otherwise: () => Yup?.date()?.nullable(),
      }),
    plannedEndDate: Yup?.date()
      ?.nullable()
      .min(
        Yup?.ref('plannedStartDate'),
        'Planned end date is after planned start date',
      ),
    associatesAssets: Yup?.mixed()?.nullable(),
    attachFile: Yup?.mixed()?.nullable(),
  });
};
export const upsertTicketDefaultValuesFunction = (data?: any) => {
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
    plannedStartDate: !!data?.plannedStartDate
      ? localeDateTime(data?.plannedStartDate)
      : null,
    plannedEndDate: !!data?.plannedEndDate
      ? localeDateTime(data?.plannedEndDate)
      : null,
    plannedEffort: data?.plannedEffort ?? '',
    associatesAssets: !!data?.associateAssets?.length
      ? data?.associateAssetsDetails
      : [],
    attachFile: null,
  };
};

export const upsertTicketFormFieldsDynamic = (
  childTicketId?: string,
  getValues?: any,
  setValue?: any,
  watch?: any,
) => [
  {
    _id: 1,
    component: RequesterFieldDropdown,
  },
  {
    _id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },

  ...(!!!childTicketId
    ? [
        {
          _id: 4,
          component: CategoryFieldDropdown,
        },
        {
          _id: 5,
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
          _id: 6,
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
          _id: 7,
          component: DepartmentFieldDropdown,
        },
        {
          _id: 8,
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
          _id: 9,
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
          _id: 10,
          component: AgentFieldDropdown,
        },
        {
          _id: 11,
          componentProps: {
            name: 'plannedStartDate',
            label: 'Planned Start Date',
            fullWidth: true,
            ampm: false,
            textFieldProps: { readOnly: true },
          },
          component: RHFDesktopDateTimePicker,
          md: 12,
        },
        {
          _id: 13,
          componentProps: {
            name: 'plannedEndDate',
            label: 'Planned End Date',
            fullWidth: true,
            ampm: false,
            textFieldProps: { readOnly: true },
            minDateTime: watch('plannedStartDate'),
          },
          component: RHFDesktopDateTimePicker,
          md: 12,
        },
        {
          _id: 15,
          componentProps: {
            name: 'plannedEffort',
            label: 'Planned Effort',
            placeholder: 'Eg: 1h10m',
            onBlurHandler: () => {
              const value = getValues('plannedEffort');
              setValue('plannedEffort', formatDurationHourMinute(value));
            },
          },
          component: RHFTextField,
        },
        {
          _id: 16,
          component: AssetFieldDropdown,
        },
      ]
    : []),
  {
    _id: 17,
    componentProps: {
      name: 'attachFile',
      fullWidth: true,
      fileType: `PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`,
      accept: {
        'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
        'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
        'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
      },
    },
    component: RHFDropZone,
  },
];
