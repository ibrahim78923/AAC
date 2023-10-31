import React from 'react';
import { Box } from '@mui/material';
import BoardCard from './BoardCard';
import { styles } from './BoardView.style';

const BoardView = () => {
  return (
    <Box sx={styles.boardContainer}>
      <Box sx={styles.boardRow}>
        <Box sx={styles.boardColumn}>
          <BoardCard
            dealStage={'New'}
            stageDealsNumber={2}
            stageDealsAmount={40}
            stageDealsPercent={20}
          />
        </Box>

        <Box sx={styles.boardColumn}>
          <BoardCard
            dealStage={'Follow Up'}
            stageDealsNumber={2}
            stageDealsAmount={40}
            stageDealsPercent={20}
          />
        </Box>

        <Box sx={styles.boardColumn}>
          <BoardCard
            dealStage={'Under Review'}
            stageDealsNumber={2}
            stageDealsAmount={40}
            stageDealsPercent={20}
          />
        </Box>

        <Box sx={styles.boardColumn}>
          <BoardCard
            dealStage={'Demo'}
            stageDealsNumber={2}
            stageDealsAmount={40}
            stageDealsPercent={20}
          />
        </Box>

        <Box sx={styles.boardColumn}>
          <BoardCard
            dealStage={'Negotiation'}
            stageDealsNumber={2}
            stageDealsAmount={40}
            stageDealsPercent={20}
          />
        </Box>

        <Box sx={styles.boardColumn}>
          <BoardCard
            dealStage={'Won'}
            stageDealsNumber={2}
            stageDealsAmount={40}
            stageDealsPercent={20}
          />
        </Box>

        <Box sx={styles.boardColumn}>
          <BoardCard
            dealStage={'Lost'}
            stageDealsNumber={2}
            stageDealsAmount={40}
            stageDealsPercent={20}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BoardView;
