import { Box, Typography } from '@mui/material';
import { mediumPasswordPolicyData } from './MediumPasswordPolicy.data';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const MediumPasswordPolicy = () => {
  return (
    <>
      {mediumPasswordPolicyData?.map((item: any) => (
        <Box display={'flex'} alignItems={'center'} gap={1} key={item?._id}>
          {item?.select ? (
            <RadioButtonUncheckedIcon sx={{ mb: 1 }} />
          ) : (
            <CheckCircleIcon color="primary" sx={{ mb: 1 }} />
          )}
          {item?.select ? (
            <Typography
              variant="body2"
              mb={1}
              sx={{ textDecoration: 'line-through' }}
            >
              {item?.text}
            </Typography>
          ) : (
            <Typography variant="body2" mb={1}>
              {item?.text}
            </Typography>
          )}
        </Box>
      ))}
    </>
  );
};
