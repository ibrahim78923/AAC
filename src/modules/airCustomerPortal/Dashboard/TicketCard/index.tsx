import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { FirstAidKitIcon } from '@/assets/icons';
import { styles } from './TicketCard.style';
import { TICKET_TYPE, TICKET_TYPE_DETAIL, totalSum } from './TicketCard.data';

export const TicketCard = (props: any) => {
  const { totalCount, data, isLoading, isFetching }: any = props;
  const { palette }: any = useTheme();
  const { mainWrapper, contentWrapper, progressBar }: any = styles;

  if (isLoading || isFetching) return <Skeleton />;

  if (TICKET_TYPE?.TOTAL === data?.[0]) return;

  return (
    <Box sx={mainWrapper}>
      <Box sx={contentWrapper}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: TICKET_TYPE_DETAIL(data)?.[data?.[0]]?.color,
          }}
        >
          <FirstAidKitIcon />
        </Avatar>
        <Box>
          <Typography variant="h3" fontWeight={700} color="blue.main">
            {TICKET_TYPE_DETAIL(data)?.[data?.[0]]?.count}
          </Typography>
          <Typography fontSize={'0.75rem'} color="blue.light">
            {TICKET_TYPE_DETAIL(data)?.[data?.[0]]?.label}
          </Typography>
        </Box>
      </Box>
      <LinearProgress
        value={totalSum(data, totalCount)}
        variant="determinate"
        sx={progressBar(palette, TICKET_TYPE_DETAIL(data)?.[data?.[0]]?.color)}
      />
      <Typography variant="body2" pt={1} color="blue.main">
        Tickets Done:{' '}
        {`${TICKET_TYPE_DETAIL(data)?.[data?.[0]]?.count}/${totalCount?.[
          TICKET_TYPE?.TOTAL
        ]}`}
      </Typography>
    </Box>
  );
};
