import { UseFormReturn } from 'react-hook-form';

export interface QuestionsI {
  isSection: number;
  qusLoading: boolean;
  secLoading: boolean;
  sectionAppend: (value: any) => void;
  sectionCondition: boolean;
  sectionIndex: number;
  sectionVerification: boolean;
  setCreateSurvey: React.Dispatch<React.SetStateAction<string>>;
  setSubmitIndex: React.Dispatch<
    React.SetStateAction<{
      index: number;
      sectionId: string;
    }>
  >;
  setSubmitType: React.Dispatch<React.SetStateAction<string>>;
  methods: UseFormReturn<any>;
  unSaveSection: {
    index: number;
    section: any;
  };
}
