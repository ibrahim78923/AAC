import { UseFormReturn } from 'react-hook-form';

export interface SurveyListI {
  openImport: boolean;
  setOpenImport: React.Dispatch<React.SetStateAction<boolean>>;
  setSurveyId: React.Dispatch<React.SetStateAction<string>>;
  setQuestionsList: React.Dispatch<React.SetStateAction<boolean>>;
  sectionIndex: number;
  methods: UseFormReturn<any>;
}
