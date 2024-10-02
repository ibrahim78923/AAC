import {
  Box,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import useProfileStatistics from './useProfileStatistics';

export const ProfileStatistics = () => {
  const { cardsArray, theme, cardFooterColors } = useProfileStatistics();

  return (
    <Box>
      <Typography
        mb={2}
        variant="body1"
        fontWeight={600}
        color={theme?.palette?.grey[600]}
      >
        Profile Statistics
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
        {cardsArray?.map((card) => (
          <Card
            key={card?.title}
            sx={{ minWidth: '240px', marginRight: '16px', borderRadius: '8px' }}
          >
            <CardContent sx={{ px: '10px', py: '16px' }}>
              <Stack direction="row" gap={1} alignItems="center">
                <Image src={card?.icon} height={42} width={45} alt="icon" />
                <Typography variant="body1" fontWeight={600}>
                  {card.title}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                background: cardFooterColors(card?.title),
                padding: '10px',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography
                  color={theme?.palette?.common?.white}
                  variant="body2"
                  fontWeight={500}
                >
                  Followers
                </Typography>
                <Typography
                  color={theme?.palette?.common?.white}
                  variant="body2"
                  fontWeight={700}
                >
                  {card.followers}k{' '}
                </Typography>
              </Box>
              <Box
                sx={{
                  color: theme?.palette?.custom?.success_text,
                  background: theme?.palette?.common?.white,
                  borderRadius: '20px',
                  px: 1,
                }}
              >
                <Typography variant={'body3'} fontWeight={600}>
                  {card?.percentage}%
                </Typography>
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
