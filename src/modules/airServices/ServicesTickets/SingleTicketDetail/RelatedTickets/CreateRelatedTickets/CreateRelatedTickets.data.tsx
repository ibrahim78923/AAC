import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { InputAdornment } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const createTicketValidationSchema: any = Yup?.object()?.shape({
  requester: Yup?.mixed()?.nullable()?.required('Required'),
  subject: Yup?.string()?.trim()?.required('Required'),
  description: Yup?.string(),
  category: Yup?.mixed()?.nullable(),
  status: Yup?.string()?.required('Required'),
  priority: Yup?.string()?.required('Required'),
  department: Yup?.mixed()?.nullable(),
  source: Yup?.string(),
  impact: Yup?.string(),
  agent: Yup?.mixed()?.nullable(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  associateAssets: Yup?.string(),
  plannedEffort: Yup?.string(),
  attachFile: Yup?.mixed()?.nullable(),
});

export const createTicketDefaultValues: any = {
  requester: null, //01
  subject: '', //2
  description: '', //3
  category: null, //4
  status: '', //5
  priority: '', //6
  department: null, //7
  source: '', //8
  impact: '', //9
  agent: null, //10
  plannedStartDate: new Date(), //11
  plannedStartTime: new Date(), //12
  plannedEndDate: new Date(), //13
  plannedEndTime: new Date(), //14
  plannedEffort: '',
  associateAssets: '',
  attachFile: null, //16
};

export const createTicketDataArrayFunction = (
  requesterList: any = [],
  agentList: any = [],
  // serviceCategoriesList: any = [],
  departmentList: any = [],
) => [
  // Todo: will be letter use with requester dropdown api
  // {
  //   id: 2,
  //   componentProps: {
  //     name: 'requester',
  //     label: 'Requester',
  //     placeholder: 'Requester',
  //     fullWidth: true,
  //     required: true,
  //     apiQuery: requesterQuery,
  //     externalParams: { role: ROLES?.ORG_REQUESTER, limit: 50 },
  //   },
  //   component: RHFAutocompleteAsync,
  // },
  {
    id: 2,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      placeholder: 'Requester',
      fullWidth: true,
      required: true,
      options: requesterList,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
  {
    id: 1233452,
    componentProps: {
      name: 'category',
      label: 'Category',
      placeholder: 'Category',
      fullWidth: true,
      options: [
        'HARDWARE',
        'SOFTWARE',
        'NETWORK',
        'OFFICE_APPLICATION',
        'OFFICE_FURNITURE',
      ],
      // options: serviceCategoriesList,
      // getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 1352,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Status',
      required: true,
      fullWidth: true,
      options: ['OPEN', 'CLOSE', 'PENDING', 'RESOLVED'],
    },
    component: RHFAutocomplete,
  },
  {
    id: 1353742,
    componentProps: {
      name: 'priority',
      label: 'Priority',
      placeholder: 'Priority',
      required: true,
      fullWidth: true,
      options: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    },
    component: RHFAutocomplete,
  },
  {
    id: 1233242,
    componentProps: {
      name: 'department',
      label: 'Department',
      placeholder: 'Department',
      fullWidth: true,
      options: departmentList,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 13542,
    componentProps: {
      name: 'source',
      label: 'Source',
      placeholder: 'Source',
      fullWidth: true,
      options: ['PHONE', 'EMAIL', 'PORTAL', 'CHAT'],
    },
    component: RHFAutocomplete,
  },
  {
    id: 13542,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      placeholder: 'Impact',
      fullWidth: true,
      options: ['LOW', 'MEDIUM', 'HIGH'],
    },
    component: RHFAutocomplete,
  },
  {
    id: 1232,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      placeholder: 'agent',
      fullWidth: true,
      options: agentList,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'associateAssets',
      label: 'Associate Assets',
      fullWidth: true,
      select: false,
      required: false,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <AddCircleIcon color={'secondary'} />
          </InputAdornment>
        ),
      },
    },
    options: [{ value: 'BE', label: 'BE' }],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'attachFile',
      label: 'Attach a File',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
