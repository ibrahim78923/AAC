import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const callQueueValidationSchema = Yup.object().shape({
  country: Yup.string(),
  state: Yup.string(),
  digit: Yup.string(),
});

export const callQueueDefaultValues = {
  country: '',
  state: '',
  digit: '',
};

export const callQueueArray = [
  {
    componentProps: {
      name: 'queueName',
      label: 'Call Queue Name',
      placeholder: 'Air Applecart',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'playMessage',
      label: 'Play Message',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'caller',
      label: 'Caller Will Be Attended By',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'all', label: 'All Agents' },
      { value: 'sales', label: 'Sales' },
      { value: 'john', label: 'John Jams' },
    ],
    component: RHFSelect,
    md: 6,
  },
];
