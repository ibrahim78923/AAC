import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDesktopDateTimePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import { Typography } from '@mui/material';

export const predefinedCreateTicketsFields = [
  {
    id: 1,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      required: true,
      placeholder: 'Add Requester',
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
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
      placeholder: 'Choose Category',
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      required: true,
      placeholder: 'Choose Status',
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
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      name: 'department',
      label: 'Department',
      placeholder: 'Choose Department',
    },
    component: RHFAutocomplete,
  },
  {
    id: 8,
    componentProps: {
      name: 'source',
      label: 'Source',
      placeholder: 'Choose Source',
    },
    component: RHFAutocomplete,
  },
  {
    id: 9,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      placeholder: 'Choose Impact',
    },
    component: RHFAutocomplete,
  },
  {
    id: 10,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      placeholder: 'Choose Agent',
    },
    component: RHFAutocomplete,
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
  },
  {
    id: 13,
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 15,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
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
      placeholder: 'Choose Assets',
    },
    component: RHFAutocomplete,
  },
  {
    id: 17,
    componentProps: {
      name: 'attachFile',
    },
    component: RHFDropZone,
  },
];

export const predefinedTicketTimeEntriesFields = [
  {
    id: 1,
    componentProps: {
      name: 'task',
      label: 'Task',
      placeholder: 'Choose Task',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      placeholder: 'Choose Agent',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 3,
    componentProps: {
      name: 'hours',
      label: 'Hours',
      placeholder: 'Eg: 1h 10m',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Choose Status',
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'on',
      label: 'On',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 6,
    componentProps: {
      name: 'note',
      label: 'Note',
      style: { height: '200px' },
    },
    component: RHFEditor,
  },
];

export const predefinedTicketTaskFields = [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'Title',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      required: true,
      style: {
        height: 200,
      },
    },
    component: RHFEditor,
  },
  {
    id: 3,
    componentProps: {
      name: 'departmentId',
      label: 'Department',
      required: true,
      placeholder: 'Chose department',
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'assignTo',
      label: 'Assign To',
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'notifyBefore',
      label: 'Notify Before',
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      name: 'startDate',
      label: 'Planned Start Date',
      fullWidth: true,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 8,
    componentProps: {
      name: 'endDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 9,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      placeholder: 'Eg: 1h10m',
    },
    component: RHFTextField,
  },
];

export const predefinedAssetsFields = [
  {
    id: 1,
    componentProps: {
      name: 'displayName',
      label: 'Display name',
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: 'assetType',
      label: 'Asset Type',
      placeholder: 'All Assets',
      required: true,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      placeholder: 'Choose Impact',
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: 'description',
      label: 'Description',
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'assetLifeExpiry',
      label: 'Expiry date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      variant: 'h4',
    },
    heading: 'Assignment',
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      name: 'location',
      label: 'Location',
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 8,
    componentProps: {
      name: 'department',
      label: 'Department',
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 9,
    componentProps: {
      name: 'assignedOn',
      label: 'Assigned on',
      fullWidth: true,
    },
    component: RHFDesktopDateTimePicker,
    md: 6,
  },
  {
    id: 10,
    componentProps: {
      name: 'usedBy',
      label: 'Used By',
      placeholder: 'Name',
    },
    component: RHFAutocomplete,
    md: 6,
  },
];

export const predefinedContractsFields = [];

export const predefinedPurchaseOrderFields = [
  {
    id: 1,
    componentProps: {
      name: 'orderName',
      label: 'Order Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'orderNumber',
      label: 'Order Number',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'vendor',
      label: 'Vendor',
      placeholder: 'Select Vendor',
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'currency',
      label: 'Currency',
      placeholder: 'Select Currency',
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'department',
      label: 'Department',
      placeholder: 'Select Department',
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'expectedDeliveryDate',
      label: 'Expected delivery date',
      required: true,
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 7,
    componentProps: {
      name: 'location',
      label: 'Location',
      placeholder: 'Select Location',
    },
    component: RHFAutocomplete,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'termAndCondition',
      label: 'Terms and Conditions',
      multiline: true,
      minRows: 3,
      placeholder: 'Enter Description',
    },
    component: RHFTextField,
  },
];

export const predefinedVendorFields = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'contactName',
      label: 'Contact Name',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'phone',
      label: 'Phone',
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'mobile',
      label: 'Mobile',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'email',
      label: 'Email',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'description',
      label: 'Description',
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
  {
    id: 7,
    componentProps: {
      name: 'address',
      label: 'Address',
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      name: 'country',
      label: 'Country',
    },
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      name: 'state',
      label: 'State',
    },
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      name: 'city',
      label: 'City',
    },
    component: RHFTextField,
  },
  {
    id: 11,
    componentProps: {
      name: 'zipCode',
      label: 'Zip Code',
    },
    component: RHFTextField,
  },
];

export const predefinedSoftwareFields = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter Description',
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'status',
      label: 'Status',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'type',
      label: 'Type',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'category',
      label: 'Category',
    },
    component: RHFTextField,
  },
  {
    id: 7,
    componentProps: {
      name: 'managedBy',
      label: 'Managed By',
    },
    component: RHFAutocomplete,
  },
];

export const predefinedDepartmentFields = [
  {
    id: 2,
    componentProps: {
      label: 'Name',
      name: 'name',
      placeholder: 'Enter Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      label: 'Department Head',
      name: 'departmentHeadDetails',
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      label: 'Description',
      name: 'description',
      style: { height: '150px' },
    },
    component: RHFEditor,
  },
  {
    id: 6,
    componentProps: {
      label: 'Members',
      name: 'membersListDetails',
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 1,
    componentProps: {
      name: 'fileUrl',
      label: 'Image',
      fileName: 'Upload File',
    },
    component: RHFDropZone,
  },
];

export const predefinedAddRequesterFields = [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'Job Title',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    id: 6,
    componentProps: {
      name: 'createdAt',
      label: 'Date of Request',
      fullWidth: true,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 7,
    componentProps: {
      name: 'timezone',
      label: 'Time Zone',
      placeholder: 'Select Time Zone',
    },
    component: RHFAutocomplete,
  },
];

export const predefinedAddAgentFields = [
  {
    id: 1,
    componentProps: {
      name: 'firstName',
      placeholder: 'First Name',
      label: 'First Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'lastName',
      placeholder: 'Last Name',
      label: 'Last Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'email',
      placeholder: 'Email',
      label: 'Email',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'phoneNumber',
      placeholder: 'Phone Number',
      label: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'departmentId',
      label: 'Department',
      placeholder: 'Select Department',
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'permissionsRole',
      label: 'Role',
      placeholder: 'Select Role',
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      name: 'timezone',
      label: 'Time Zone',
      placeholder: 'Select Time Zone',
    },
    component: RHFAutocomplete,
  },
];
