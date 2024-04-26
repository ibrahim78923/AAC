import { RHFEditor, RHFSelect, RHFTextField } from '@/components/ReactHookForm';

export const editFaqsDataArray = (onViewDisabled: boolean) => [
  {
    componentProps: {
      name: 'faqCategory',
      label: 'Select FAQ Category',
      select: true,
      disabled: onViewDisabled,
    },
    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Service', label: 'Service' },
      { value: 'Operations', label: 'Operations' },
      { value: 'Loyalty Program', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'faqQuestion',
      label: 'Question',
      disabled: onViewDisabled,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'faqAnswer',
      label: 'Answer',
      disabled: onViewDisabled,
    },
    component: RHFEditor,
    md: 12,
  },
];
