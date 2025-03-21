import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface DraggableTextProps {
  id: string;
  position: { x: number; y: number };
  children: React.ReactNode;
}

const DraggableText: React.FC<DraggableTextProps> = ({
  id,
  position,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const currentX = position.x + (transform?.x || 0);
  const currentY = position.y + (transform?.y || 0);

  const style = {
    position: 'absolute',
    top: currentY,
    left: currentX,
    zIndex: 100,
    width: '100%',
    maxWidth: '430px',
  };

  return (
    <Box ref={setNodeRef} sx={style}>
      <IconButton
        {...listeners}
        {...attributes}
        sx={{
          fontSize: '20px',
          cursor: 'move',
          position: 'absolute',
          top: '5px',
          left: '10px',
          '& > svg': {
            height: '20px',
            width: '20px',
          },
        }}
      >
        <DragIndicatorIcon />
      </IconButton>
      {children}
    </Box>
  );
};

export default React.memo(DraggableText);
