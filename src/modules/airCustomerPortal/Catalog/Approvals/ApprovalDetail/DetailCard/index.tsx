import { DATE_TIME_FORMAT } from '@/constants';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

export const DetailCard = (props: any) => {
  const { data, openTicketDetail } = props;
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Box
      border={'1px solid'}
      borderColor={'custom.off_white'}
      borderRadius={2}
      p={2}
      onClick={() => openTicketDetail?.(data)}
      sx={{ cursor: 'pointer' }}
    >
      <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
        <Avatar
          sx={{ bgcolor: 'blue.main' }}
          style={{ width: 30, height: 30 }}
          src={data?.requesterDetails?.profileImg?.src}
          variant="rounded"
        >
          <Typography variant="body2" textTransform={'uppercase'}>
            {fullNameInitial(
              data?.requesterDetails?.firstName,
              data?.requesterDetails?.lastName,
            )}
          </Typography>
        </Avatar>
        <Box>
          <Typography>
            {` ${' '} ${data?.ticketDetails?.subject ?? ''}`}
          </Typography>
          <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            <Typography
              variant="body3"
              fontWeight={400}
              color={'custom.dark_grey'}
            >
              {' '}
              Stage :
            </Typography>
            <Typography variant="body3" fontWeight={400} color={'blue.main'}>
              {' '}
              {data?.approvalStatus}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box my={3}>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          flexWrap={'wrap'}
          my={1.5}
        >
          <Typography
            variant="body3"
            fontWeight={400}
            color={'custom.dark_grey'}
          >
            {' '}
            Approval :
          </Typography>
          <Typography variant="body3" fontWeight={400} color={'blue.main'}>
            {' '}
            {data?.approvalStatus}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          flexWrap={'wrap'}
          my={1.5}
        >
          <Typography
            variant="body3"
            fontWeight={400}
            color={'custom.dark_grey'}
          >
            {' '}
            Requested by :
          </Typography>
          <Typography variant="body3" fontWeight={400} color={'blue.main'}>
            {' '}
            {`${
              fullName(
                data?.requesterDetails?.firstName,
                data?.requesterDetails?.lastName,
              ) === 'None'
                ? ''
                : `${fullName(
                    data?.requesterDetails?.firstName,
                    data?.requesterDetails?.lastName,
                  )}`
            }, ${dayjs(data?.createdAt).format(DATE_TIME_FORMAT?.UI)}`}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          flexWrap={'wrap'}
          my={1.5}
        >
          <Typography
            variant="body3"
            fontWeight={400}
            color={'custom.dark_grey'}
          >
            {' '}
            Requester :
          </Typography>
          <Typography variant="body3" fontWeight={400} color={'blue.main'}>
            {' '}
            {data?.requesterDetails?.email}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          flexWrap={'wrap'}
          my={1.5}
        >
          <Typography
            variant="body3"
            fontWeight={400}
            color={'custom.dark_grey'}
          >
            {' '}
            Status :
          </Typography>
          <Typography variant="body3" fontWeight={400} color={'blue.main'}>
            {' '}
            {data?.approvalStatus}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          flexWrap={'wrap'}
          my={1.5}
        >
          <Typography
            variant="body3"
            fontWeight={400}
            color={'custom.dark_grey'}
          >
            {' '}
            Priority :
          </Typography>
          <Typography variant="body3" fontWeight={400} color={'blue.main'}>
            {' '}
            {data?.ticketDetails?.pirority}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={1}
          flexWrap={'wrap'}
          my={1.5}
        >
          <Typography
            variant="body3"
            fontWeight={400}
            color={'custom.dark_grey'}
          >
            {' '}
            Assign to :
          </Typography>
          <Typography variant="body3" fontWeight={400} color={'blue.main'}>
            {' '}
            {data?.approvalStatus}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body2"
        fontWeight={500}
        color={'primary.main'}
        sx={{ cursor: 'pointer' }}
        onClick={() => setShowInfo((previousState: any) => !previousState)}
      >
        {' '}
        {showInfo ? 'Hide info' : 'Show info'}
      </Typography>
      {showInfo && (
        <Box
          mt={3}
          dangerouslySetInnerHTML={{ __html: data?.ticketDetails?.description }}
        />
      )}
    </Box>
  );
};
