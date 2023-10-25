export const styles = {
  productWiseGraph: (theme: any) => {
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
