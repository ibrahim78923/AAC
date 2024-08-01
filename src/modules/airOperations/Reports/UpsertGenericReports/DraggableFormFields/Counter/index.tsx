import { Box, Button, Typography } from '@mui/material';
import { useCounter } from './useCounter';
import { CounterI } from './Counter.interface';

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
      <Typography variant="h5">{draggedItemData?.title}</Typography>
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
        <Button onClick={handleCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};
