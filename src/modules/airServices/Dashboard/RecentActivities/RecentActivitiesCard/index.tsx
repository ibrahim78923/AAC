import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { ClipboardTickImage } from '@/assets/images';

export const RecentActivitiesCard = (props: any) => {
  const { data, index } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        gap: 2,
        background: 'common.white',
        borderBottom: data?.data?.length - 1 !== index ? `1px solid` : 'none',
        borderColor: 'grey.700',
      }}
      py={2}
    >
      <Box marginLeft={2}>
        <Avatar
          alt=""
          src={ClipboardTickImage?.src}
          sx={{ width: '2.063rem', height: '2rem' }}
        />
      </Box>
      <Box>
        <Typography color={'grey.600'} variant="body3">
          <Typography
            component="span"
            color="custom.bright"
            variant="subtitle2"
          >
            {fullName(
              data?.userDetails?.firstName,
              data?.userDetails?.lastName,
            )}
          </Typography>{' '}
          has {data?.activityType?.toLowerCase()}{' '}
          <Typography
            component="span"
            color="custom.bright"
            variant="subtitle2"
          >
            {data?.moduleName}
          </Typography>
        </Typography>
        <Typography color={'grey.600'} component={'p'} variant="body3">
          {dayjs(data?.createdAt)?.format(DATE_TIME_FORMAT?.DMDHMA)}
        </Typography>
      </Box>
    </Box>
  );
};
