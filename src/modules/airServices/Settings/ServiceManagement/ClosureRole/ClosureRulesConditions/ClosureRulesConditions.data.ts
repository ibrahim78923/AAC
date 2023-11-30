import { RHFRadioGroup, RHFCheckbox } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const conditionsValidationSchema = Yup?.object()?.shape({
  timeAdded: Yup?.mixed(),
  associatedTasksCompleted: Yup?.string(),
  childTickets: Yup?.string(),
  closedResolved: Yup?.mixed(),
});

export const conditionsDefaultValues = {
  timeAdded: '',
  associatedTasksCompleted: '',
  childTickets: '',
  closedResolved: '',
};

export const conditionsDataArray = [
  {
    id: 2341,
    componentProps: {
      name: 'timeAdded',
      label: 'Time entry is added',
    },
    component: RHFCheckbox,
  },
  {
    id: 7675,
    componentProps: {
      name: 'associatedTasksCompleted',
      label: 'Associated tasks are completed',
    },
    component: RHFCheckbox,
  },
  {
    id: 8401,
    componentProps: {
      name: 'childTickets',
      label: 'Child tickets',
    },
    component: RHFCheckbox,
  },
  {
    id: 6587,
    componentProps: {
      name: 'closedResolved',
      label: '',
      fullWidth: true,
      row: false,
      options: [
        { value: 'Closed', label: 'Closed' },
        {
          value: 'Either closed or resolved',
          label: 'Either closed or resolved',
        },
      ],
    },
    component: RHFRadioGroup,
  },
];
