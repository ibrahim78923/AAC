import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface CreateSurveyI {
  methods: UseFormReturn<FieldValues>;
  isLoading: boolean;
  setSubmitType: React.Dispatch<React.SetStateAction<string>>;
}
