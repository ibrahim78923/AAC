import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { uiDateFormat } from '@/lib/date-time';
import { fullName, fullNameInitial, truncateText } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

export const DetailCard = (props: any) => {
  const { data, openTicketDetail, approvalInfo } = props;
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
        <CustomAvatar
          nameInitial={fullNameInitial(
            data?.requesterDetails?.firstName,
            data?.requesterDetails?.lastName,
          )}
          avatarSize={{
            width: 30,
            height: 30,
            variant: AVATAR_VARIANTS?.ROUNDED,
          }}
          avatarSrc={data?.requesterDetails?.avatar?.url}
        />
        <Box>
          <Typography>
            {` ${' '} ${truncateText(data?.subject, 30) ?? '---'}`}
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
              {approvalInfo?.approvalStatus ?? '---'}
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
            {approvalInfo?.approvalStatus ?? '---'}
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
            {`${fullName(
              data?.requesterDetails?.firstName,
              data?.requesterDetails?.lastName,
            )}, ${'  '} ${uiDateFormat(data?.createdAt)}`}
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
            {data?.requesterDetails?.email ?? '---'}
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
            {data?.status ?? '---'}
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
            {data?.pirority ?? '---'}
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
            {fullName(
              data?.agentDetails?.firstName,
              data?.agentDetails?.lastName,
            )}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body2"
        fontWeight={500}
        color={'primary.main'}
        sx={{ cursor: 'pointer' }}
        onClick={(e: any) => {
          e?.stopPropagation();
          setShowInfo((previousState: any) => !previousState);
        }}
      >
        {' '}
        {showInfo ? 'Hide info' : 'Show info'}
      </Typography>
      {showInfo &&
        (!!data?.description ? (
          <Box mt={3} dangerouslySetInnerHTML={{ __html: data?.description }} />
        ) : (
          '---'
        ))}
    </Box>
  );
};
