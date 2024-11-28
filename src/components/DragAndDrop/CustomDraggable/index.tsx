import { Box } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

const CustomDraggable = (props: any) => {
  const { draggableId, index, children, keys, draggableStyle } = props;
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <Box
          {...provided?.dragHandleProps}
          {...provided?.draggableProps}
          ref={provided?.innerRef}
          sx={draggableStyle}
          key={keys}
        >
          {children}
        </Box>
      )}
    </Draggable>
  );
};

export default CustomDraggable;
