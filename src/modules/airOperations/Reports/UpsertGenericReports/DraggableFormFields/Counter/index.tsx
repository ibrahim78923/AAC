import { Box, Button, Typography } from '@mui/material';
import { useCounter } from './useCounter';
import { CounterI } from './Counter.interface';
import { TruncateText } from '@/components/TruncateText';

export const Counter = (props: CounterI) => {
  const { draggedItemData, handleCancel } = props;
  const { handleSave } = useCounter(props);
  return (
    <Box
      border={1}
      borderColor={'grey.700'}
      borderRadius={2}
      p={1}
      width={'50%'}
    >
      <TruncateText text={draggedItemData?.title} />
      <Box p={10}>
        <Typography
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          variant="h1"
          color={'primary'}
        >
          {draggedItemData?.ticketCount}
        </Typography>
      </Box>
      <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
        <Button
          onClick={handleCancel}
          className="small"
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="small"
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
