import { RHFTextField, RHFSelect } from '@/components/ReactHookForm';
import { TICKETS_ISSUES_TYPE } from '@/constants/strings';
import * as Yup from 'yup';

export const issueRelated = [
  {
    value: TICKETS_ISSUES_TYPE?.SERVICES,
    label: 'Services',
  },
  {
    value: TICKETS_ISSUES_TYPE?.INCIDENT,
    label: 'Incident',
  },
];
export const validationSchemaReportAnIssueModal = Yup?.object()?.shape({
  issueRelatedTo: Yup?.string().required(),
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
    options: issueRelated,
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
