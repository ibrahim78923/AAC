import {
  RHFTextField,
  RHFSelect,
  RHFDropZone,
} from '@/components/ReactHookForm';
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
  issueRelatedTo: Yup?.string()?.trim()?.required('Required'),
  requester: Yup?.string()?.trim()?.required('Required'),
  subject: Yup?.string()?.trim()?.required('Required'),
});

export const defaultValues = {
  issueRelatedTo: '',
  requester: '',
  subject: '',
  description: '',
};

export const reportAnIssueModalFormFields = [
  {
    id: 1,
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
    id: 2,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
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
    id: 4,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      minRows: 5,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'attachFile',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
