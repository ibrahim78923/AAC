import { UseFormReturn } from 'react-hook-form';

export interface ImportQuestionsI {
  openImport: boolean;
  setOpenImport: React.Dispatch<React.SetStateAction<boolean>>;
  sectionIndex: number;
  methods: UseFormReturn<any>;
}
