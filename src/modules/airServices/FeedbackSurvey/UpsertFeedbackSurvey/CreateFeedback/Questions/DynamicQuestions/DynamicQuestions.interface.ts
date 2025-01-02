import { UseFormReturn } from 'react-hook-form';

export interface DynamicQuestionsI {
  sectionIndex: number;
  questionIndex: number;
  methods: UseFormReturn<any>;
  watchType: {
    id?: number;
    label: string;
    value: string;
    icon?: JSX.Element;
  };
  sectionCondition: boolean;
}
