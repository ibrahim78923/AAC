export const styles = {
  productWiseGraph: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '10px',
      '&._custom .apexcharts-canvas .apexcharts-svg .apexcharts-inner .apexcharts-line-series .apexcharts-datalabels .apexcharts-data-labels':
        {
          position: 'relative',
          height: '20px',
          width: '20px',
        },
      '.apexcharts-legend': {
        padding: '10px 0px',
        margin: '-5px 10px',
        position: 'relative !important',
        justifyContent: 'flex-end !important',
        gap: '24px',
        '& .apexcharts-legend-series': {
          gap: '5px',
        },
      },
      '.apexcharts-toolbar .apexcharts-menu-icon': {
        display: 'none',
      },
    };
  },
};
