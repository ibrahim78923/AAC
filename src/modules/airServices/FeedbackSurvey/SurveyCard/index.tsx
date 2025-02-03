import { CustomCircularProgressBar } from '@/components/ProgressBars/CustomCircularProgressBar';
import { Box, Typography } from '@mui/material';
import { SurveyCardI } from './SurveyCard.interface';
import { IconAvatar } from '@/components/Avatars/IconAvatar';

export const SurveyCard: React.FC<SurveyCardI> = (props) => {
  const { hasSpinner, data, hasStatusIcon } = props;
  return (
    <Box
      display="flex"
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      gap={2}
      bgcolor={'common.white'}
      boxShadow={2}
      p={2}
      borderRadius={2}
      alignItems={'center'}
      height={'100%'}
    >
      <Box>
        <Typography variant="body4" color="slateBlue.main">
          {data?.status}
        </Typography>
        <Box display={'flex'} gap={0.5} alignItems={'center'}>
          <IconAvatar backgroundColor={'transparent'}>
            <data.rateIcon />
          </IconAvatar>
          <Typography variant="body1" color="slateBlue.main" fontWeight={600}>
            {data?.rate ?? '---'}
          </Typography>
        </Box>
      </Box>
      {hasSpinner && (
        <CustomCircularProgressBar
          size={50}
          thickness={3}
          progressColor={data?.progressColor}
          value={data?.progress}
        />
      )}
      {hasStatusIcon && (
        <IconAvatar
          avatarSize={{ width: 35, height: 35 }}
          backgroundColor={'transparent'}
        >
          <data.statusIcon />
        </IconAvatar>
      )}
    </Box>
  );
};
