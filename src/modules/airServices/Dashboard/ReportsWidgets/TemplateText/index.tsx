import { Box, Chip, Typography } from '@mui/material';
import { pxToRem } from '@/utils/getFontValue';
import { ARRAY_INDEX } from '@/constants/strings';

export const TemplateText = (props: any) => {
  const { title = '', data } = props;
  const count = data?.[title]?.[ARRAY_INDEX?.ZERO]?.[title];
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
        {title}
      </Typography>
      <Chip
        color="primary"
        label={count ?? 0}
        sx={{
          fontSize: pxToRem(16),
          fontWeight: 500,
        }}
      />
    </Box>
  );
};
