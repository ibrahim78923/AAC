import { Avatar, Box, Typography } from '@mui/material';
import { FirstAidKitIcon } from '@/assets/icons';
import { TicketCardI } from './TicketCard.interface';
import { TruncateText } from '@/components/TruncateText';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';

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
        display={'flex'}
        alignItems={'center'}
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
      <CustomLinearProgress
        value={Math?.floor((data?.count / totalCount) * 100)}
        variant="determinate"
        progressBarColor={data?.color}
      />
      <Typography variant="body2" pt={1} color="blue.main">
        Tickets Status: {`${data?.count}/${totalCount}`}
      </Typography>
    </Box>
  );
};
