import { FolderIcon } from '@/assets/icons';
import { Box, Typography, useTheme } from '@mui/material';

export const TicketsCard = (props: any) => {
  const { heading, subHeading, created, status } = props;
  const theme = useTheme();
  return (
    <Box
      gap={2}
      padding={1.5}
      borderRadius={3}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
      height={'auto'}
      sx={{ cursor: 'pointer', backgroundColor: theme?.palette?.grey?.[100] }}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        padding={2}
        gap={1}
      >
        <Typography variant="h6">{heading}</Typography>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <FolderIcon />
          <Typography variant="body1">{subHeading}</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="body2">Created:{created}</Typography>
          <Typography variant="body2">Via Portal</Typography>
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={5}
        padding={1}
        sx={{ backgroundColor: theme?.palette?.grey?.[400] }}
      >
        <Typography variant="body2">{status}</Typography>
      </Box>
    </Box>
  );
};
