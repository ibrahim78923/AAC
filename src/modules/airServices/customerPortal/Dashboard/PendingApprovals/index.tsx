import { CardLayout } from '../CardLayout';
import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from './PendingApprovals.style';
import { v4 as uuidv4 } from 'uuid';

export const PendingApprovals = ({
  title,
  data: pendingApprovalData,
  handleViewMore,
}: any) => {
  const { palette }: any = useTheme();
  const { mainWrapper, approvalWrapper, approvalTicket, divider } = styles;
  return (
    <CardLayout title={title} btnClick={handleViewMore} maxHeight={260}>
      <Box my="0.75rem">
        {pendingApprovalData?.map(({ user, ...approval }: any) => (
          <Box key={uuidv4()} sx={mainWrapper(palette)}>
            <Typography fontWeight={600} color={palette?.blue?.main}>
              Request for :
              <Typography
                component={'span'}
                variant="body2"
                sx={approvalTicket(palette)}
              >{`${approval?.ticketNumber}, ${approval?.ticketTitle}`}</Typography>
            </Typography>
            <Box sx={approvalWrapper}>
              <Avatar></Avatar>
              <Typography
                color={palette?.blue?.light}
              >{`${user?.firstName} ${user?.lastName} sent approval request `}</Typography>
              <Box sx={divider(palette)} />
              <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
                {approval?.requestTime}
              </Typography>
              <Box sx={divider(palette)} />
              <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
                {approval?.device}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </CardLayout>
  );
};
