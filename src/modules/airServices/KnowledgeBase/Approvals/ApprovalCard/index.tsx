import { Box, Typography } from '@mui/material';
import { styles } from './ApprovalCard.style';

const ApprovalCard = ({ title, folder, author, approvalStatus }: any) => {
  return (
    <Box sx={styles?.cardWrapper}>
      <Box>
        <Typography color={'primary.main'} fontWeight={500} variant="h5">
          {title}
        </Typography>
        <Typography sx={styles?.label} fontWeight={500} component={'span'}>
          folder:
        </Typography>
        <Typography sx={styles?.label} component={'span'}>
          {` ${folder}`}
        </Typography>
      </Box>
      <Box>
        <Typography sx={styles?.label} fontWeight={500} pb={0.4}>
          author
        </Typography>
        <Typography sx={styles?.label}>{author}</Typography>
      </Box>
      <Typography sx={styles?.approvalStatusBtn}>{approvalStatus}</Typography>
    </Box>
  );
};

export default ApprovalCard;
