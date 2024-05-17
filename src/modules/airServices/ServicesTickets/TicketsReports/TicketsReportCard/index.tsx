import { Box, Chip, Typography } from '@mui/material';
import { pxToRem } from '@/utils/getFontValue';

export const TicketsReportCard = (props: any) => {
  const { label, chipValue } = props;

  return (
    <Box
      boxShadow={1}
      border={'1px solid'}
      borderColor={'custom.off_white_one'}
      borderRadius={2}
      px={2}
      py={3}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Typography variant={'h6'} color={'slateBlue.main'}>
        {label}
      </Typography>
      <Chip
        color="primary"
        label={chipValue}
        sx={{
          fontSize: pxToRem(16),
          fontWeight: 500,
        }}
      />
    </Box>
  );
};
