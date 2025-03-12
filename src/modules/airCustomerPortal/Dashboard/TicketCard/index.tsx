import { Box, Typography } from '@mui/material';
import { FirstAidKitIcon } from '@/assets/icons';
import { TruncateText } from '@/components/TruncateText';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { PROGRESS_VALUE } from '@/constants/mui-constant';
import { IconAvatar } from '@/components/Avatars/IconAvatar';

export const TicketCard = (props: any) => {
  const { totalCount = 0, color, count = 0, label } = props;
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
        <IconAvatar
          avatarSize={{
            width: 36,
            height: 36,
          }}
          backgroundColor={color}
        >
          <FirstAidKitIcon />
        </IconAvatar>
        <Box>
          <Typography variant="h3" fontWeight={700} color="blue.main">
            {count}
          </Typography>
          <TruncateText text={label?.toLowerCase()} />
        </Box>
      </Box>
      <CustomLinearProgress
        value={
          count === PROGRESS_VALUE?.ZERO
            ? PROGRESS_VALUE?.ZERO
            : Math?.floor((count / totalCount) * 100)
        }
        variant="determinate"
        progressBarColor={color}
        progressBarLabel={label}
      />
      <Typography variant="body2" pt={1} color="blue.main">
        Tickets Status: {`${count}/${totalCount}`}
      </Typography>
    </Box>
  );
};
