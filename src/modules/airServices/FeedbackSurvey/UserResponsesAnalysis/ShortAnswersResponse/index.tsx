import NoData from '@/components/NoData';
import { Box, Typography } from '@mui/material';

export const ShortAnswersResponse = (props: any) => {
  const { question, answers } = props;
  return (
    <Box bgcolor={'common.white'} p={2} boxShadow={1} borderRadius={2}>
      <Typography variant="body2">{question}</Typography>
      <br />
      {!!answers?.length ? (
        answers?.map((answer: any, index: any) => (
          <Box display={'flex'} gap={1} alignItems={'center'} key={answer}>
            <Typography variant="body2" component={'p'}>
              {index + 1}.
            </Typography>
            <Typography variant="body2" component={'p'}>
              {answer}
            </Typography>
          </Box>
        ))
      ) : (
        <NoData message="No answers yet" height="" />
      )}
    </Box>
  );
};
