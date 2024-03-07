import { Box, Divider, Typography, useTheme } from '@mui/material';
import Chip from '@mui/material/Chip';

export const SingleTicketDetail = ({
  status,
  singleTicketDetailContent,
}: any) => {
  const theme = useTheme();
  return (
    <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }}>
      <Box
        width={{ xs: '100%', sm: '70%' }}
        height={'20rem'}
        overflow={'scroll'}
        dangerouslySetInnerHTML={{ __html: singleTicketDetailContent }}
      />
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          margin: '0 2rem',
          border: `.1rem solid ${theme?.palette?.grey[700]}`,
          backgroundColor: 'transparent',
        }}
      />
      <Box
        gap={1}
        display={'flex'}
        flexDirection={'column'}
        width={{ xs: '100%', sm: '30%' }}
        padding={2}
      >
        <Typography variant="body1" fontWeight={700} mt={2}>
          Status
        </Typography>
        <Box>
          {status ? (
            <Chip
              label={status}
              sx={{ backgroundColor: 'custom.bright', color: 'white' }}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
