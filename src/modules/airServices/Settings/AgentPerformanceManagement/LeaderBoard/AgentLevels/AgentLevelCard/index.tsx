import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

const AgentLevelCard = (props: any) => {
  const { palette }: any = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2.4,
        py: 1.2,
        borderRadius: 2,
        boxShadow: 1,
        border: `1px solid ${palette?.grey?.['0']}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Image src={props?.icon} alt={props?.title} width={40} height={36} />
        <Typography variant="h4" pb={0.6} color={'slateBlue.main'}>
          {props?.title}
        </Typography>
      </Box>
      <Box minWidth={142}>
        <Typography
          fontSize={14}
          fontWeight={500}
          pb={0.4}
          color={palette?.grey?.[600]}
        >
          After collecting
        </Typography>
        <Box
          sx={{
            border: `1px solid ${palette?.grey?.['0']}`,
            borderRadius: 1,
            p: 0.5,
          }}
        >
          {props?.points}
        </Box>
      </Box>
    </Box>
  );
};

export default AgentLevelCard;
