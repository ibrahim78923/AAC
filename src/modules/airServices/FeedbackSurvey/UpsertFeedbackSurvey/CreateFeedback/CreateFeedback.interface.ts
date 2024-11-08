import { FeedbackSurveySectionI } from '@/types/modules/AirServices/FeedbackSurvey';
import { UseFormReturn } from 'react-hook-form';

export interface CreateFeedbackI {
  qusLoading: boolean;
  secLoading: boolean;
  setCreateSurvey: React.Dispatch<React.SetStateAction<string>>;
  setSubmitIndex: React.Dispatch<
    React.SetStateAction<{
      sectionId: string;
      index: number;
    }>
  >;
  setSubmitType: React.Dispatch<React.SetStateAction<string>>;
  unSaveSection: { index: number; section: FeedbackSurveySectionI };
  sectionVerification: boolean;
  methods: UseFormReturn<any>;
}

export interface SectionDropdownI {
  fields: any[];
  cloneSection: (index: number, setClose: () => void) => void;
  removeSection: (index: number, setClose: () => void) => void;
  mergeSection: (index: number, setClose: () => void) => void;
  index: number;
  sectionCondition: boolean;
  deleteLoading: boolean;
  mergeLoading: boolean;
  cloneLoading: boolean;
  sectionVerification: boolean;
}

export interface FeedbackDropdownI {
  handlePublish: (handleClose: () => void) => void;
  handleSaveDraft: (handleClose: () => void) => void;
  updateLoading: boolean;
  emailLoading: boolean;
  isStatus: boolean;
}
