import {
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { InputAdornment } from '@mui/material';
import { PlusSharedColorIcon } from '@/assets/icons';

export const createTicketValidationSchema: any = Yup?.object()?.shape({
  requester: Yup?.string()?.required('Field is Required'),
  subject: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string(),
  category: Yup?.string(),
  status: Yup?.string()?.required('Field is Required'),
  priority: Yup?.string()?.required('Field is Required'),
  department: Yup?.string(),
  source: Yup?.string(),
  impact: Yup?.string(),
  agent: Yup?.string(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.string(),
  attachFile: Yup?.mixed(),
});

export const createTicketDefaultValues: any = {
  requester: '', //01
  subject: '', //2
  description: '', //3
  category: '', //4
  status: '', //5
  priority: '', //6
  department: '', //7
  source: '', //8
  impact: '', //9
  agent: '', //10
  plannedStartDate: new Date(), //11
  plannedStartTime: new Date(), //12
  plannedEndDate: new Date(), //13
  plannedEndTime: new Date(), //14
  plannedEffort: '',
  attachFile: null, //16
};

export const createTicketDataArray = [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      select: false,
      required: true,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <PlusSharedColorIcon color={'#6B7280'} />
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
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Hardware', label: 'Hardware' },
      { value: 'Hardware', label: 'Hardware' },
      { value: 'Sofware', label: 'Sofware' },
      { value: 'Network', label: 'Network' },
      { value: 'Office Application', label: 'Office Application' },
      { value: 'Office Furniture', label: 'Office Furniture' },
      { value: 'Office Equipment', label: 'Office Equipment' },
      { value: 'Employee Benefits', label: 'Employee Benefits' },
      {
        value: 'Employee Records and Documents',
        label: 'Employee Records and Documents',
      },
      {
        value: 'Employee Onboarding/Offboarding',
        label: 'Employee Onboarding/Offboarding',
      },
      { value: 'Talent Management', label: 'Talent Management' },
      { value: 'Employees Relations', label: 'Employees Relations' },
      {
        value: 'Workplace Access and Security',
        label: 'Workplace Access and Security',
      },
      { value: 'Travel', label: 'Travel' },
      {
        value: 'Building and Ground Maintenance',
        label: 'Building and Ground Maintenance',
      },
      { value: 'Vendor Document Review', label: 'Vendor Document Review' },
      { value: 'Payroll', label: 'Payroll' },
      { value: 'Vendor Payment', label: 'Vendor Payment' },
      { value: 'Customer Payment', label: 'Customer Payment' },
      {
        value: 'Reimbursement and Advances',
        label: 'Reimbursement and Advances',
      },
      { value: 'Legal Document Creation', label: 'Legal Document Creation' },
      {
        value: 'Legal Review-Vendor Documents',
        label: 'Legal Review-Vendor Documents',
      },
      {
        value: 'Legal Review-Customer Documents',
        label: 'Legal Review-Customer Documents',
      },
      { value: 'Other', label: 'Other' },
    ],
    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'Open', label: 'Open' },
      { value: 'Close', label: 'Close' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Resolved', label: 'Resolved' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
      { value: 'Urgent', label: 'Urgent' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'IT', label: 'IT' },
      { value: 'HR', label: 'HR' },
      { value: 'Finance', label: 'Finance' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Phone', label: 'Phone' },
      { value: 'Email', label: 'Email' },
      { value: 'Portal', label: 'Portal' },
      { value: 'Chat', label: 'Chat' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Andrew Schulz', label: 'Andrew Schulz' },
      { value: 'Ryan Miler', label: 'Ryan Miler' },
    ],
    component: RHFSelect,
    md: 12,
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
      name: 'requester',
      label: 'Associate Assets',
      fullWidth: true,
      select: false,
      required: false,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <PlusSharedColorIcon color={'#38CAB5'} />
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
