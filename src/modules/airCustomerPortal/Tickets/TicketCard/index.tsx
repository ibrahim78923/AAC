import { Box, Typography, useTheme } from '@mui/material';

export const TicketsCard = (props: any) => {
  const { heading, subHeading, created, status, icon } = props;
  const theme = useTheme();
  return (
    <Box
      gap={2}
      padding={1.4}
      borderRadius={3}
      display={'flex'}
      flexDirection={{ xs: 'column', sm: 'row', lg: 'row' }}
      justifyContent={{
        xs: 'center',
        sm: 'space-between',
        lg: 'space-between',
      }}
      alignItems={'center'}
      width={'100%'}
      height={'auto'}
      bgcolor={theme?.palette?.grey?.[100]}
      sx={{ cursor: 'pointer' }}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        padding={2}
        gap={1}
      >
        <Typography variant="h5">{heading}</Typography>

        <Typography
          width={'100%'}
          gap={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          variant="body1"
        >
          {icon}
          {subHeading}
        </Typography>

        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="body2">Created: {created} -</Typography>
          <Typography variant="body2" color="primary">
            Via Portal
          </Typography>
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={5}
        padding={1}
        bgcolor={theme?.palette?.grey?.[400]}
      >
        <Typography variant="body2">{status}</Typography>
      </Box>
    </Box>
  );
};
