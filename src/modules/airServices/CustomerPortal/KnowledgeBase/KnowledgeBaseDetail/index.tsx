import { ArrowLeftIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import { knowledgeBaseDetailContent } from '../KnowledgeBase.data';
import HTMLRenderer from '@/components/HTMLRenderer';

export const KnowledgeBaseDetail = () => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={1}
      >
        <ArrowLeftIcon />
        <Typography variant="h6">Expense Reimbursement Policy</Typography>
      </Box>
      <Box mt={3}>
        <HTMLRenderer content={knowledgeBaseDetailContent} />
      </Box>
    </>
  );
};
