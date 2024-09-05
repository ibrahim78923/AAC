interface SurveyOption {
  index?: number;
  text: string;
  isCorrected?: boolean;
  _id?: string;
}

interface SurveyAnswer {
  singleAnswer?: string;
  multiAnswer?: string[];
  userEmail: string;
}
interface QuestionTypeObject {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
}
type QuestionType = QuestionTypeObject | string;
export interface FeedbackSurveyQuestionI {
  _id?: string;
  id?: string;
  questionTitle: string;
  questionType: QuestionType;
  options?: SurveyOption[];
  text?: SurveyOption[];
  answers: SurveyAnswer[];
  description: string;
  isRequired: boolean;
  order: number;
  surveyId: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeedbackSurveySectionI {
  _id?: string;
  id?: string;
  heading: string;
  description: string;
  questionIds?: string[];
  questions?: FeedbackSurveyQuestionI[];
}

export interface FeedbackSurveyI {
  _id?: string;
  surveyTitle: string;
  description: string;
  displayName: string;
  status: string;
  surveyType: string;
  isDefault: boolean | null;
  display?: boolean;
  shareSurveyPeople?: any[];
  sendSurveyPeople?: any[];
  createdAt?: string;
  updatedAt?: string;
  satisfactionSurveyLinkType: string;
  subject: string;
  surveyDuration: string | null;
  UUID: string;
  magicLink: string;
  customerSupportLinkType: string;
  companyId?: string;
  organizationId?: string;
  sections?: FeedbackSurveySectionI[];
}
export interface FeedbackSurveyListI {
  _id: string;
  surveyTitle: string;
  status: string;
  isDefault?: boolean;
  surveyType: string;
  createdAt: string;
  magicLink?: string;
}
export interface FeedbackResponsesAnalysisI {
  answers: { percentage: number; text: string }[];
  question: string;
  score?: undefined;
}
