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
} from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { RequesterFieldDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/RequesterFieldDropdown';
import { pxToRem } from '@/utils/getFontValue';
import { CategoryFieldDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/CategoryFieldDropdown';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { DepartmentFieldDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/DepartmentFieldDropdown';
import { AgentFieldDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/AgentFieldDropdown';
import { AssetFieldDropdown } from '@/modules/airServices/ServicesTickets/ServiceTicketFormFields/AssetFieldDropdown';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { formatDurationHourMinute } from '@/utils/dateTime';

const { SERVICES_TICKETS_SUBJECT_MAX_CHARACTERS } = CHARACTERS_LIMIT ?? {};

export const newIncidentValidationSchema = (form: any) => {
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
      ?.required('Description is Required')
      ?.test('is-not-empty', 'Description is Required', (value) => {
        const strippedContent = value
          ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
          ?.trim();
        return strippedContent !== '';
      }),
    category: Yup?.mixed()?.nullable(),
    status: Yup?.mixed()?.nullable()?.required('Status is required'),
    priority: Yup?.mixed()?.nullable()?.required('Priority is Required'),
    department: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    plannedStartDate: Yup?.date(),
    plannedEndDate: Yup?.date()
      ?.nullable()
      ?.required('Planned End Date is Required'),
    plannedEffort: Yup?.string()?.trim(),
    associatesAssets: Yup?.mixed()?.nullable(),
    attachFile: Yup?.mixed()?.nullable(),
    ...formSchema,
  });
};

export const newIncidentsDefaultValuesFunction = (form?: any) => {
  const initialValues: any = dynamicFormInitialValue({}, form);

  return {
    requester: null,
    subject: '',
    description: '',
    category: null,
    status: null,
    priority: null,
    department: null,
    source: null,
    impact: null,
    agent: null,
    plannedStartDate: new Date(),
    plannedEndDate: null,
    plannedEffort: '',
    associatesAssets: [],
    attachFile: null,
    ...initialValues,
  };
};
export const getNewIncidentFormFieldsDynamic = (
  getValues?: any,
  setValue?: any,
) => [
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
      required: true,
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },
  {
    id: 4,
    component: CategoryFieldDropdown,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
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
      required: true,
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
      placeholder: 'Eg: 1h10m',
      onBlurHandler: () => {
        const value = getValues('plannedEffort');
        setValue('plannedEffort', formatDurationHourMinute(value));
      },
    },
    component: RHFTextField,
  },
  {
    id: 16,
    component: AssetFieldDropdown,
  },
  {
    id: 17,
    componentProps: {
      name: 'attachFile',
    },
    component: RHFDropZone,
  },
];
