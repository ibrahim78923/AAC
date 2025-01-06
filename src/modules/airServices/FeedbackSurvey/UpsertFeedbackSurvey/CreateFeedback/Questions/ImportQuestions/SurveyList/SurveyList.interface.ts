export interface SurveyListI {
  openImport: boolean;
  setSurveyId: React.Dispatch<React.SetStateAction<string>>;
  setQuestionsList: React.Dispatch<React.SetStateAction<boolean>>;
}
