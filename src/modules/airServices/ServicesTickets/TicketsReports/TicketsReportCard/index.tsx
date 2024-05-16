import { Box, Typography } from '@mui/material';

export const TicketsReportCard = (props: any) => {
  const { label, chipValue, theme } = props;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={2.5}
      border={`.1rem solid ${theme?.palette?.grey[700]}`}
      borderRadius={2}
    >
      <Typography variant="body1">{label}</Typography>
      <Box
        padding="0.3rem 0.8rem"
        borderRadius={'45%'}
        bgcolor={'primary.main'}
        color={'white'}
      >
        <Typography variant="body1">{chipValue}</Typography>
      </Box>
    </Box>
  );
};
