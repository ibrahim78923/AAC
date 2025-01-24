import { TruncateText } from '@/components/TruncateText';
import { Box } from '@mui/material';

export const ItemSummaryCard = (props: any) => {
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
      {Icon !== null && Icon}
      <TruncateText text={name?.toLowerCase()} />
    </Box>
  );
};
