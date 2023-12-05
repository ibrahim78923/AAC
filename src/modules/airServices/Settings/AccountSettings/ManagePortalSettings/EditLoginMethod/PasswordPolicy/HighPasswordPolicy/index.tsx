import { Box, Typography } from '@mui/material';
import { highPasswordPolicyData } from './HighPasswordPolicy.data';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const HighPasswordPolicy = () => {
  return (
    <>
      {highPasswordPolicyData?.map((item: any) => (
        <Box display={'flex'} alignItems={'center'} gap={1} key={item?._id}>
          <CheckCircleIcon color="primary" sx={{ mb: 1 }} />
          <Typography variant="body2" mb={1}>
            {item?.text}
          </Typography>
        </Box>
      ))}
    </>
  );
};
