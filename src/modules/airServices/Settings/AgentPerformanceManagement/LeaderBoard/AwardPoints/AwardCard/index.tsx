import { StaticAvatar } from '@/components/Avatars/StaticAvatar';
import { Box, Typography } from '@mui/material';

const AwardCard = (props: any) => {
  const { icon, title, text, borderColor } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderLeft: `2px solid `,
        p: 3.6,
        gap: 3.6,
        borderRadius: 2,
        boxShadow: 1,
        borderColor,
      }}
    >
      <StaticAvatar
        avatarSrc={icon?.src}
        avatarSize={{ width: 50, height: 60 }}
        alt={title}
      />
      <Box>
        <Typography fontWeight={600} pb={0.6} color={'slateBlue.main'}>
          {title}
        </Typography>
        <Typography color={'custom.main'} fontSize={12}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default AwardCard;
