import { SOCIAL_COMPONENTS } from '@/constants';
import { Box, Typography } from '@mui/material';

export const MeetingCard = (props: any) => {
  const { heading, meetingsCount, color, router } = props;

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
      sx={{
        cursor: 'pointer',
        '&:hover': {
          border: `0.1rem solid ${color}`,
          borderLeft: `0.5rem solid ${color}`,
        },
      }}
      onClick={() =>
        router?.push({
          pathname: SOCIAL_COMPONENTS?.MEETINGS,
          query: {
            type: heading,
          },
        })
      }
    >
      <Typography color={'secondary'}>{heading}</Typography>
      <Typography variant="h4">{meetingsCount}</Typography>
    </Box>
  );
};
