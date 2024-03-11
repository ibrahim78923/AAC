import Image from 'next/image';
import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Typography, useTheme } from '@mui/material';

const AgentLevelCard = (props: any) => {
  const { palette }: any = useTheme();
  return (
    <Box
      sx={{
        px: 2.4,
        py: 1.2,
        borderRadius: 2,
        boxShadow: 1,
        border: `1px solid ${palette?.grey?.[0]}`,
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
          <Image src={props?.icon} alt={props?.title} width={40} height={36} />
          <Typography
            variant="h4"
            color={'slateBlue.main'}
            textTransform={'capitalize'}
          >
            {props?.title}
          </Typography>
        </Box>
        <Box>
          <RHFTextField
            name={props?.title}
            label="After collecting"
            required
            size="small"
            sx={{ maxWidth: 204 }}
          >
            {props?.points}
          </RHFTextField>
        </Box>
      </Box>
    </Box>
  );
};

export default AgentLevelCard;
