import {
  RHFSelect,
  RHFDropZone,
  RHFTextField,
  RHFEditor,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { InputAdornment, IconButton } from '@mui/material';
import { AddPlusPrimaryIcon } from '@/assets/icons';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  campaign: Yup.string().required('Field is Required'),
  contacts: Yup.string().required('Field is Required'),
  details: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  name: '',
  campaign: '',
  template: '',
  contacts: '',
  details: '',
  attachment: '',
};

export const createBroadcastFields = (handleOpenContactsDrawer: any) => [
  {
    id: '01',
    componentProps: {
      label: 'Broadcast Name',
      name: 'name',
      fullWidth: true,
      placeholder: 'Enter Name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: '02',
    componentProps: {
      label: 'Campaign',
      name: 'campaign',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'campaign1', label: 'Campaign 1' },
      { value: 'campaign2', label: 'Campaign 2' },
      { value: 'campaign3', label: 'Campaign 3' },
      { value: 'campaign4', label: 'Campaign 4' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: '03',
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
    id: '04',
    componentProps: {
      name: 'contacts',
      label: 'Add Contacts',
      fullWidth: true,
      required: true,
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleOpenContactsDrawer} edge="end">
              <AddPlusPrimaryIcon />
            </IconButton>
          </InputAdornment>
        ),
      },
      placeholder: 'Select Contacts',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: '05',
    component: RHFEditor,
    md: 12,
    componentProps: {
      name: 'details',
      label: 'Details',
      fullWidth: true,
      required: true,
    },
  },
  {
    id: '06',
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
