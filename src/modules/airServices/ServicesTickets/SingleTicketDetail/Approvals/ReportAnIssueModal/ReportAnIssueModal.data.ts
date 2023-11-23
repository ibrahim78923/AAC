import { RHFTextField, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaReportAnIssueModal = Yup?.object()?.shape({
  issueRelatedTo: Yup?.string(),
  requester: Yup?.string(),
  subject: Yup?.string(),
});

export const defaultValues = {
  issueRelatedTo: '',
  requester: '',
  subject: '',
  description: '',
};

export const reportAnIssueModalDataArray = [
  {
    componentProps: {
      name: 'issueRelatedTo',
      label: 'Issue Related To',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Services',
        label: 'Services',
      },
      {
        value: 'Incident',
        label: 'Incident',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      minRows: 5,
    },
    component: RHFTextField,
    md: 12,
  },
];
