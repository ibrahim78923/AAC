import { RHFMultiCheckbox } from '@/components/ReactHookForm';

export const customDefaultValues = {
  file: [],
};

export const RecordModalData = [
  {
    componentProps: {
      // label: 'Select Forms*',
      name: 'file',
      GridView: 6,
      options: [
        { value: 'CSV', label: 'CSV' },
        { value: 'XLS', label: 'XLS' },
      ],
    },
    component: RHFMultiCheckbox,
  },
];
