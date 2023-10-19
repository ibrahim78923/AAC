import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { CustomBoxI } from './CustomBox.interface';
import { styles } from '../Insight.style';

const CustomBox = ({ title, count, desc }: CustomBoxI) => {
  const { weekCard } = styles(useTheme());
  return (
    <Box sx={weekCard}>
      <Typography className="week_title">{title}</Typography>
      <Typography className="week_count">{count}</Typography>
      {desc && (
        <Box>
          <Typography className="week_desc">{desc}</Typography>
        </Box>
      )}
    </Box>
  );
};
export default CustomBox;
