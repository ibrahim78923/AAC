import { pxToRem } from '@/utils/getFontValue';
import { Box, Chip, Grid, Typography } from '@mui/material';

export const ContractReportsCard = ({ contractReportsCardData }: any) => {
  return (
    <Grid container spacing={1.5} mb={2}>
      {Object?.entries(contractReportsCardData)?.map(([key, value]: any) => (
        <Grid item xs={3} key={key}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            border={'1px solid '}
            borderColor={'custom.off_white_one'}
            boxShadow={1}
            borderRadius={2}
            height={'100%'}
            px={2}
            py={3}
          >
            <Typography variant={'h6'} color={'slateBlue.main'}>
              {key}
            </Typography>
            <Chip
              label={value}
              sx={{
                fontSize: pxToRem(16),
                fontWeight: 500,
              }}
              color="primary"
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
