import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const RuleTypeCard = (props: any) => {
  const { type, handleClick } = props;
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      gap={1}
      flexWrap={'wrap'}
      border="1px solid"
      sx={{ borderColor: 'custom.off_white', cursor: 'pointer' }}
      p={2}
      borderRadius={3}
      onClick={() => handleClick?.(type)}
    >
      <Typography variant="body1" fontWeight={600} color={'slateBlue.main'}>
        {type?.label}
      </Typography>
      <ArrowForwardIcon />
    </Box>
  );
};
