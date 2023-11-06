import { ArrowLeftIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import { knowledgeBaseDetailContent } from '../KnowledgeBase.data';
import { useKnowledgeBase } from '../useKnowledgeBase';

const HTMLRenderer = ({ content }: any) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

export const KnowledgeBaseDetail = () => {
  const { handleKnowledgeBase } = useKnowledgeBase();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={1}
      >
        <Box onClick={() => handleKnowledgeBase()} sx={{ cursor: 'pointer' }}>
          <ArrowLeftIcon />
        </Box>
        <Typography variant="h6">Expense Reimbursement Policy</Typography>
      </Box>
      <Box mt={3}>
        <HTMLRenderer content={knowledgeBaseDetailContent} />
      </Box>
    </>
  );
};
