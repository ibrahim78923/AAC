import { Box, Chip, Divider, Typography, useTheme } from '@mui/material';

export const SingleTicketDetail = ({
  status,
  singleTicketDetailContent,
}: any) => {
  const theme = useTheme();
  return (
    <Box display={'flex'} gap={1} flexWrap={'wrap'}>
      <Box
        flex={0.8}
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
      <Box>
        <Typography
          variant="body1"
          fontWeight={700}
          color="slateBlue.main"
          mb={1}
        >
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
