import { Box } from '@mui/material';
import { StrictModeDroppable as Droppable } from '../StrictModeDroppable';

const CustomDroppable = (props: any) => {
  const { droppableId, children, droppableStyle } = props;

  return (
    <>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <Box
            {...provided?.droppableProps}
            ref={provided?.innerRef}
            sx={droppableStyle}
          >
            {children}
            {provided?.placeholder}
          </Box>
        )}
      </Droppable>
    </>
  );
};

export default CustomDroppable;
