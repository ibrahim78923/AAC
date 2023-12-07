import { Box, Typography } from '@mui/material';
import Image from 'next/image';
const AwardCard = (props: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderLeft: `2px solid ${props?.borderColor}`,
        p: 3.6,
        gap: 3.6,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Image src={props?.icon} alt={props?.title} width={48} height={56} />
      <Box>
        <Typography fontWeight={600} pb={0.6} color={'slateBlue.main'}>
          {props?.title}
        </Typography>
        <Typography color={'custom.main'} fontSize={12}>
          {props?.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default AwardCard;
