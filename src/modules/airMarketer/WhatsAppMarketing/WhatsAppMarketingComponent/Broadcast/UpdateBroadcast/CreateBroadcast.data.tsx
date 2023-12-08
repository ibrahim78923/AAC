import {
  RHFSelect,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  compaign: Yup.string().required('Field is Required'),
  contacts: Yup.string().required('Field is Required'),
  details: Yup.string().required('Field is Required'),
  attachment: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  name: '',
  compaign: '',
  template: '',
  contacts: '',
  details: '',
  attachment: '',
};

export const createBroadcastFields = [
  {
    componentProps: {
      label: 'Broadcast Name',
      name: 'name',
      fullWidth: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Compaign',
      name: 'compaign',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'compaign1', label: 'Compaign 1' },
      { value: 'compaign2', label: 'Compaign 2' },
      { value: 'compaign3', label: 'Compaign 3' },
      { value: 'compaign4', label: 'Compaign 4' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      label: 'Use Template (Optional)',
      name: 'template',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'template1', label: 'Template 1' },
      { value: 'template2', label: 'Template 2' },
      { value: 'template3', label: 'Template 3' },
      { value: 'template4', label: 'Template 4' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'contacts',
      label: 'Add Contacts',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    component: RHFTextField,
    md: 12,
    componentProps: {
      name: 'details',
      label: 'Details',
      fullWidth: true,
      multiline: true,
      rows: '4',
    },
  },
  {
    component: RHFDropZone,
    md: 12,
    title: 'Attachment',
    componentProps: {
      name: 'attachment',
      label: 'Attachment',
      fullWidth: true,
      multiline: true,
      rows: '4',
    },
  },
];

export const contactDetails: any = [
  {
    Id: 1,
    Name: 'Jerome Bell',
    PhoneNumber: '(219) 555-0114',
  },
  {
    Id: 2,
    Name: 'Theresa Webb',
    PhoneNumber: '(219) 555-0115',
  },
];

export const contactsColumns: any = [
  {
    accessorFn: (row: any) => row?.Name,
    id: 'name',
    isSortable: false,
    header: 'Name',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
  {
    accessorFn: (row: any) => row?.PhoneNumber,
    id: 'phoneNo',
    isSortable: false,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
];
