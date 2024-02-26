import Image from 'next/image';
import { Box, Typography, useTheme, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { IncTicketIcon } from '@/assets/icons';
import { DATE_TIME_FORMAT } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const TicketsCard = (props: any) => {
  const {
    id,
    heading,
    created,
    status,
    icon,
    ticketIdNumber,
    source,
    associateAssetsDetails,
    handleSingleTickets,
    isLoading,
    isFetching,
  } = props;
  const theme = useTheme();
  if (isLoading || isFetching) return <SkeletonTable />;
  return (
    <Box
      gap={2}
      borderRadius={3}
      p={1.6}
      display={'flex'}
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent={{
        xs: 'center',
        sm: 'space-between',
        lg: 'space-between',
      }}
      alignItems={'center'}
      width={'100%'}
      height={'auto'}
      bgcolor={theme?.palette?.grey?.[100]}
      sx={{ cursor: 'pointer' }}
      onClick={() => handleSingleTickets(id)}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={0.6}
      >
        <Typography variant="h5">{heading}</Typography>
        <Typography
          width={'100%'}
          gap={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          variant="body1"
        >
          {icon ? (
            <Image src={icon} alt={ticketIdNumber} height={25} width={25} />
          ) : (
            <IncTicketIcon />
          )}
          {associateAssetsDetails?.[0]?.displayName} {ticketIdNumber}
        </Typography>

        <Box
          display={'flex'}
          alignItems={'center'}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Typography variant="body2">
            Created On {dayjs(created)?.format(DATE_TIME_FORMAT?.DMYhmma)} -{' '}
          </Typography>
          <Typography variant="body2" color="primary.main">
            Via {source}
          </Typography>
        </Box>
      </Box>
      <Chip label={status} />
    </Box>
  );
};
