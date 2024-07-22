import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { useDrag } from 'react-dnd';
import { styles } from './styles';
import { controlsList } from './data';
import { ItemTypes } from '@/constants/form-builder';

const ControlItem = ({ control, source }: any) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FIELD,
    item: { type: control?.type, source },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Box ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      <Box sx={styles?.control}>
        {control?.icon}
        <Typography
          variant="h6"
          sx={{ color: (theme) => theme?.palette?.secondary?.main }}
        >
          {control?.name}
        </Typography>
      </Box>
    </Box>
  );
};

const FormControls: React.FC = () => (
  <Box>
    <Typography variant="h4">Form Block</Typography>
    <Typography variant="body2">
      Add blocks to your form by dragging them into place.
    </Typography>
    <Divider sx={{ marginY: '20px' }} />
    <Typography variant="body2" sx={{ fontWeight: '600' }}>
      Static Blocks
    </Typography>
    <Typography variant="body2">
      Add text or an image to your form page.
    </Typography>

    <Box>
      {controlsList?.map((control: any) => (
        <ControlItem key={control?.type} control={control} source="control" />
      ))}
    </Box>
  </Box>
);

export default FormControls;
