import { Box, Typography, Avatar } from '@mui/material';
import { CardLayout } from '../CardLayout';
import { useTheme } from '@mui/material/styles';
import { styles } from './RecentTickets.style';
import { v4 as uuidv4 } from 'uuid';

export const RecentTickets = ({ recentTicketsData }: any) => {
  const { palette }: any = useTheme();
  const { mainWrapper, approvalWrapper, processingBtn } = styles;
  return (
    <CardLayout title={'Recent Tickets'} btnClick={() => {}}>
      <Box my="0.75rem">
        {recentTicketsData?.map((ticket: any) => (
          <Box key={uuidv4()} sx={mainWrapper(palette)}>
            <Box>
              <Typography fontWeight={600} color={palette?.blue?.main}>
                {ticket?.title}
              </Typography>
              <Box sx={approvalWrapper}>
                <Avatar src={ticket?.icon} />
                <Typography
                  color={palette?.blue?.main}
                  fontWeight={500}
                >{` ${ticket?.ticketTitle} ${ticket?.ticketNumber}`}</Typography>
              </Box>
              <Typography color={palette?.blue?.main} fontWeight={500} pt={0.6}>
                {`${ticket?.CreatedOn}- `}
                <Typography
                  component="span"
                  fontWeight={500}
                  color="primary.main"
                >
                  {ticket?.device}
                </Typography>
              </Typography>
            </Box>
            <Typography sx={processingBtn}>Processing</Typography>
          </Box>
        ))}
      </Box>
    </CardLayout>
  );
};
