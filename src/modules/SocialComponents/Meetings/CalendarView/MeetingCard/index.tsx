import { Box, Typography } from '@mui/material';

export const MeetingCard = (props: any) => {
  const { heading, meetingsCount, color } = props;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderLeft={`.5rem solid ${color}`}
      boxShadow={2}
      padding={1.5}
      borderRadius={2}
      marginBottom={2}
      sx={{ cursor: 'pointer' }}
    >
      <Typography color={'secondary'}>{heading}</Typography>
      <Typography variant="h4">{meetingsCount}</Typography>
    </Box>
  );
};
