import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Close } from '@mui/icons-material';
import { Box, Dialog, Typography } from '@mui/material';
import { useImportQuestions } from './useImportQuestions';
import { SurveyList } from './SurveyList';
import { QuestionList } from './QuestionList';
import { ImportQuestionsI } from './ImportQuestions.interface';

export const ImportQuestions: React.FC<ImportQuestionsI> = (props) => {
  const { openImport, setOpenImport } = props;
  const { surveyId, setSurveyId, questionsList, setQuestionsList } =
    useImportQuestions();
  return (
    <Dialog
      open={openImport}
      onClose={() => setOpenImport(false)}
      maxWidth={'md'}
      fullWidth
    >
      <Box p={3}>
        <Box
          justifyContent={'space-between'}
          alignItems={'center'}
          display={'flex'}
          gap={1}
          flexWrap={'wrap'}
        >
          <Typography variant="h4">
            {!questionsList ? 'Select Form' : 'Select Questions'}
          </Typography>
          <Close
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => setOpenImport(false)}
          />
        </Box>
        <br />
        {!questionsList ? (
          <HorizontalTabs tabsDataArray={['Recent']}>
            <SurveyList
              setSurveyId={setSurveyId}
              setQuestionsList={setQuestionsList}
              {...props}
            />
          </HorizontalTabs>
        ) : (
          <QuestionList
            setQuestionsList={setQuestionsList}
            surveyId={surveyId}
            {...props}
          />
        )}
      </Box>
    </Dialog>
  );
};
