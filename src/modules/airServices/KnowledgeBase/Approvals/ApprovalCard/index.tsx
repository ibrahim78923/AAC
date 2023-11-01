import { Box, Button, Typography } from '@mui/material';
import { useApprovalCard } from './useApprovalCard';
import { styles } from './ApprovalCard.style';

const ApprovalCard = ({ title, folder, author, approvalStatus }: any) => {
  const { cardWrapper, label, approvalStatusBtn } = styles();
  const { handleApproval } = useApprovalCard();
  return (
    <Box sx={{ ...cardWrapper }}>
      <Box>
        <Typography color={'primary.main'} fontWeight={500} variant="h5">
          {title}
        </Typography>
        <Typography sx={{ ...label, fontWeight: 500 }} component={'span'}>
          folder:
        </Typography>
        <Typography sx={{ ...label }} component={'span'}>
          {` ${folder}`}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ ...label, fontWeight: 500, pb: 0.4 }}>
          author
        </Typography>
        <Typography sx={{ ...label }}>{author}</Typography>
      </Box>
      <Button sx={{ ...approvalStatusBtn }} onClick={handleApproval}>
        {approvalStatus}
      </Button>
    </Box>
  );
};

export default ApprovalCard;
