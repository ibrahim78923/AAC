import { Box, Chip, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Image from 'next/image';
import { AvatarImage } from '@/assets/images';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
export const TicketInfoCard = () => {
  return (
    <Box
      sx={{ borderRadius: '1rem', border: '1px solid grey', padding: '.5rem' }}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} marginBottom={0.5} alignItems={'center'} gap={1}>
          <Box
            sx={{
              backgroundColor: 'yellow',
              padding: '.2rem',
              borderRadius: '.2rem',
            }}
          >
            IT
          </Box>
          <Typography variant="caption">#INC-4</Typography>
        </Box>
        <Box display={'flex'} marginBottom={0.5} alignItems={'center'}>
          <Chip size="small" label="New" sx={{ backgroundColor: 'red' }} />
          <MoreVertIcon />
        </Box>
      </Box>
      <Typography variant="body1">Problem in getting the email</Typography>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <Chip
            label="New"
            size="small"
            icon={<FiberManualRecordIcon />}
            sx={{ backgroundColor: 'red' }}
          />
          <Box display={'flex'} alignItems={'center'} gap={0.2}>
            <QueryBuilderIcon />
            <Typography variant="body1">Low</Typography>
          </Box>
        </Box>
        <Image src={AvatarImage} alt="Avatar" />
      </Box>
    </Box>
  );
};
