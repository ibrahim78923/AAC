import { Box, Typography } from '@mui/material';
import React from 'react';
import { useDrag } from 'react-dnd';
import { styles } from './styles';
import { controlsList } from './data';
import { ItemTypes } from '@/constants/form-builder';
import { ControlI } from './interface';

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
    <Typography variant="h4">Content</Typography>

    <Box>
      {controlsList?.map((control: ControlI) => (
        <ControlItem key={control?.type} control={control} source="control" />
      ))}
    </Box>
  </Box>
);

export default FormControls;
