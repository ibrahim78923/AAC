import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const ViewArticleDetail = ({
  title,
  detail,
  secondTitle,
  options,
  optionsDetail,
}: any) => {
  return (
    <>
      <Typography variant="h1" py={'1rem'}>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={400} mb={'2rem'}>
        {`${detail}`}
      </Typography>
      <Typography variant="h3" py={'1rem'}>
        {secondTitle}
      </Typography>
      {options?.map((option: any, index: any) => (
        <Box key={uuidv4()}>
          <Typography variant="h6" fontWeight={600} py={'1rem'}>
            {option}
          </Typography>
          {optionsDetail[index] && (
            <Typography variant="h6" fontWeight={400} py={'.5rem'}>
              {`${optionsDetail[index]}`}
            </Typography>
          )}
        </Box>
      ))}
    </>
  );
};

export default ViewArticleDetail;
