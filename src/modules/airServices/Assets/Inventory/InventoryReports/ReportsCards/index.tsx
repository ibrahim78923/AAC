import { pxToRem } from '@/utils/getFontValue';
import { Box, Chip, Grid, Typography } from '@mui/material';

export default function ReportsCards({ cardsData }: any) {
  return (
    <Grid container spacing={1.5} mb={2}>
      {Object?.entries(cardsData)?.map(([key, value]: any) => (
        <Grid item xs={12} md={6} lg={3} key={key}>
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
              {key}
            </Typography>

            <Chip
              label={value}
              color={'primary'}
              sx={{
                fontSize: pxToRem(16),
                fontWeight: 500,
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
