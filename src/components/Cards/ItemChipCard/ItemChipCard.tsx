import { CustomChip } from '@/components/Chip/CustomChip';
import { pxToRem } from '@/utils/getFontValue';
import { Box, Typography } from '@mui/material';

export const ItemChipCard = (props: any) => {
  const { itemName, chipLabel } = props;
  return (
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
        {itemName}
      </Typography>
      <CustomChip
        label={chipLabel}
        customStyles={{
          fontSize: pxToRem(16),
          fontWeight: 500,
        }}
      />
    </Box>
  );
};
