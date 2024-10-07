import { Avatar, Box, Typography } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { FirstAidKitIcon } from '@/assets/icons';
import { TicketCardI } from './TicketCard.interface';
import { TruncateText } from '@/components/TruncateText';

export const TicketCard = (props: TicketCardI) => {
  const { totalCount, data } = props;

  return (
    <Box
      sx={{
        p: 1.2,
        borderRadius: '0.5rem',
        background: 'white',
        flex: 1,
        minWidth: 180,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1.2,
          pb: 1.2,
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: data?.color,
          }}
        >
          <FirstAidKitIcon />
        </Avatar>
        <Box>
          <Typography variant="h3" fontWeight={700} color="blue.main">
            {data?.count}
          </Typography>
          <TruncateText text={data?.label?.toLowerCase()} />
        </Box>
      </Box>
      <LinearProgress
        value={Math?.floor((data?.count / totalCount) * 100)}
        variant="determinate"
        sx={{
          height: 6,
          borderRadius: 5,
          [`&.${linearProgressClasses?.colorPrimary}`]: {
            backgroundColor: 'grey.0',
          },
          [`& .${linearProgressClasses?.bar}`]: {
            borderRadius: 5,
            backgroundColor: data?.color,
          },
        }}
      />
      <Typography variant="body2" pt={1} color="blue.main">
        Tickets Status: {`${data?.count}/${totalCount}`}
      </Typography>
    </Box>
  );
};
