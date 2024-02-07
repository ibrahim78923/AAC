import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './ApprovalCard.style';

const ApprovalCard = ({ title, folder, author, approvalStatus }: any) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textTransform: 'capitalize',
        flexWrap: 'wrap',
        p: 1.6,
        boxShadow: `0rem 0.125rem 0.25rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}, 0rem 0.25rem 0.5rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}`,
        borderRadius: 4,
        gap: 1.2,
      }}
    >
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
