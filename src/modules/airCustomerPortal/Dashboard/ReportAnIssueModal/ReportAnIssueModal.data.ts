import { RHFTextField, RHFDropZone } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaReportAnIssueModal = Yup?.object()?.shape({
  requester: Yup?.string()?.trim()?.required('Required'),
  subject: Yup?.string()?.trim()?.required('Required'),
  description: Yup?.string()?.trim()?.required('Required'),
});

export const defaultValues = {
  requester: '',
  subject: '',
  description: '',
};

export const reportAnIssueModalFormFields = [
  {
    id: 1,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      placeholder: 'Enter Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      placeholder: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      minRows: 3,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'attachFile',
      label: 'Attach File',
      fullWidth: true,
      fileType: 'Upload any file',
    },
    component: RHFDropZone,
    md: 12,
  },
];
