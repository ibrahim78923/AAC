import { UseFormReturn } from 'react-hook-form';

export interface QuestionListI {
  openImport: boolean;
  sectionIndex: number;
  setOpenImport: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestionsList: React.Dispatch<React.SetStateAction<boolean>>;
  surveyId: string;
  methods: UseFormReturn<any>;
}
