import React, { FC } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { BoardCardI } from './BoardCard.interface';
import { styles } from './BoardCard.style';

const BoardCard: FC<BoardCardI> = ({
  stageDealsNumber,
  stageDealsAmount,
  stageDealsPercent,
  sx,
  children,
  title,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ ...styles?.card, ...sx }}>
      <Box sx={styles?.cardHeader(theme)}>
        <Box sx={styles?.cardHeaderLeft}>
          <Typography
            variant="body2"
            sx={{
              color: `${theme?.palette?.blue?.main}`,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <Box sx={styles?.dealsNumber}>{stageDealsNumber}</Box>
        </Box>

        <Box sx={styles?.cardHeaderRight}>
          <Box sx={styles?.totalAmount}>
            Total: <Box component={'span'}>£{stageDealsAmount}</Box>
          </Box>
          <Box sx={styles?.dealsPercentage}>{`(${stageDealsPercent}%)`}</Box>
        </Box>
      </Box>

      <Box sx={styles?.cardBody}>{children}</Box>
    </Box>
  );
};

export default BoardCard;
