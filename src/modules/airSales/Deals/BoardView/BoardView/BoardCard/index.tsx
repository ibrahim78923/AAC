import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { BoardCardI } from './BoardCard.interface';
import { styles } from './BoardCard.style';

const BoardCard: FC<BoardCardI> = ({
  dealStage,
  stageDealsNumber,
  stageDealsAmount,
  stageDealsPercent,
  children,
}) => {
  return (
    <Box sx={styles?.card}>
      <Box sx={styles?.cardHeader}>
        <Box sx={styles?.cardHeaderLeft}>
          <Typography
            variant="body2"
            sx={{ fontWeight: '700', color: 'blue.main' }}
          >
            {dealStage}
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
