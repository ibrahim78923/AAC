import { ArrowLeftIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import { knowledgeBaseDetailData } from '../KnowledgeBase.data';

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
        <Typography variant="h3">{knowledgeBaseDetailData?.heading}</Typography>
        <Typography variant="body2" mt={1}>
          {knowledgeBaseDetailData?.description}
        </Typography>
        <Typography variant="h4" mt={1}>
          {knowledgeBaseDetailData?.subHeading}
        </Typography>
        <Typography variant="h5" mt={1}>
          {knowledgeBaseDetailData?.firstPoint}
        </Typography>
        <Typography variant="body2" mt={1}>
          {knowledgeBaseDetailData?.firstPointDescription}
        </Typography>
        <Typography variant="h5" mt={1}>
          {knowledgeBaseDetailData?.secondPoint}
        </Typography>
        <Typography variant="body2" mt={1}>
          {knowledgeBaseDetailData?.secondPointDescription}
        </Typography>
        <Typography variant="h5" mt={1}>
          {knowledgeBaseDetailData?.thirdPoint}
        </Typography>
        <Typography variant="body2" mt={1}>
          {knowledgeBaseDetailData?.thirdPointDescription}
        </Typography>
      </Box>
    </>
  );
};
