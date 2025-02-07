import { TruncateText } from '@/components/TruncateText';
import { Box } from '@mui/material';
import { ItemSummaryCardPropsI } from '../Cards.interface';

export const ItemSummaryCard = (props: ItemSummaryCardPropsI) => {
  const { onClick, name, Icon = null } = props;
  return (
    <Box
      height="100%"
      display={'flex'}
      gap={1}
      p={1}
      bgcolor="grey.100"
      alignItems={'center'}
      sx={{ cursor: 'pointer' }}
      borderRadius={2}
      onClick={onClick}
    >
      <Box>{Icon !== null && Icon}</Box>
      <TruncateText
        text={name?.toLowerCase()}
        boxProps={{ sx: { wordBreak: 'break-word' } }}
      />
    </Box>
  );
};
