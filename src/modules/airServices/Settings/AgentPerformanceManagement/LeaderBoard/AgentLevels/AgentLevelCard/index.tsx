import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import { StaticAvatar } from '@/components/Avatars/StaticAvatar';
import { AGENT_LEVELS_IMAGES } from '@/constants/images';

const AgentLevelCard = (props: any) => {
  const { title } = props;
  return (
    <Box
      sx={{
        px: 2.4,
        py: 1.2,
        borderRadius: 2,
        boxShadow: 1,
        border: `1px solid `,
        borderColor: 'grey.0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <StaticAvatar
            avatarSrc={AGENT_LEVELS_IMAGES?.[title]}
            width={40}
            height={40}
            alt={title}
          />
          <Typography
            variant="h4"
            color={'slateBlue.main'}
            textTransform={'capitalize'}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <RHFTextField
            name={title}
            label="After collecting"
            required
            size="small"
            sx={{ maxWidth: 204 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AgentLevelCard;
