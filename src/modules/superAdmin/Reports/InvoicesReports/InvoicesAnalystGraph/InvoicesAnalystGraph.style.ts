import { Theme } from '@mui/material';

export const styles = {
  productWiseGraph: (theme: Theme) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      '.apexcharts-legend.apexcharts-align-center.apx-legend-position-bottom': {
        gap: '70px',
      },
    };
  },
};
