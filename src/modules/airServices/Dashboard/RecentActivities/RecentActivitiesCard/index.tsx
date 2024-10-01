import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { DATE_TIME_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { ClipboardTickImage } from '@/assets/images';
import { TruncateText } from '@/components/TruncateText';
import { otherDateFormat } from '@/utils/dateTime';

export const RecentActivitiesCard = (props: any) => {
  const { data } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      bgcolor="common.white"
      borderBottom="1px solid"
      borderColor="grey.700"
      px={2}
      py={1.5}
    >
      <Avatar
        alt=""
        src={ClipboardTickImage?.src}
        sx={{ width: '2.063rem', height: '2rem' }}
      />
      <Box>
        <Box display={'flex'} gap={0.3} flexWrap={'wrap'}>
          <Typography color="custom.bright" variant="body2">
            {fullName(
              data?.userDetails?.firstName,
              data?.userDetails?.lastName,
            )}
          </Typography>{' '}
          <Typography variant="body2" color="slateBlue.main">
            has {data?.activityType?.toLowerCase()}
          </Typography>
          <Typography color="custom.bright" variant="body2" component={'div'}>
            <TruncateText text={data?.moduleName} size={35} isCapital={false} />
          </Typography>
        </Box>
        <Typography color={'grey.600'} component={'p'} variant="body3">
          {otherDateFormat(data?.createdAt, DATE_TIME_FORMAT?.DMDHMA)}
        </Typography>
      </Box>
    </Box>
  );
};
