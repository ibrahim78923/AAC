import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { useImportQuestions } from './useImportQuestions';
import { SurveyList } from './SurveyList';
import { QuestionList } from './QuestionList';
import { ImportQuestionsI } from './ImportQuestions.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const ImportQuestions: React.FC<ImportQuestionsI> = (props) => {
  const { openImport, setOpenImport } = props;
  const {
    surveyId,
    setSurveyId,
    questionsList,
    setQuestionsList,
    questionsData,
    setQuestionsData,
    handleInsert,
  } = useImportQuestions(props);
  return (
    <CustomCommonDialog
      isPortalOpen={openImport}
      closePortal={() => setOpenImport(false)}
      handleCancelButton={() => setQuestionsList(false)}
      handleSubmitButton={handleInsert}
      showActionButtons={questionsList}
      disabledSubmitButton={!!!questionsData?.length}
      dialogTitle={!questionsList ? 'Select Survey Form' : 'Select Questions'}
      cancelButtonText="Back"
      submitButtonText="Insert"
      dialogMaxWidth={'md'}
    >
      {!questionsList ? (
        <HorizontalTabs tabsDataArray={['Recent']}>
          <SurveyList
            setSurveyId={setSurveyId}
            setQuestionsList={setQuestionsList}
            openImport={openImport}
          />
        </HorizontalTabs>
      ) : (
        <QuestionList
          surveyId={surveyId}
          questionsData={questionsData}
          setQuestionsData={setQuestionsData}
        />
      )}
    </CustomCommonDialog>
  );
};
