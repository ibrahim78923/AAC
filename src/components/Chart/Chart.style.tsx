// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import { cssStyles } from './Chart.utils';

export default function ChartStyle() {
  const theme: any = useTheme();
  return (
    <GlobalStyles
      styles={{
        '&.apexcharts-canvas': {
          // Tooltip
          '.apexcharts-xaxistooltip': {
            ...cssStyles(theme).bgBlur(),
            border: 0,
            color: theme.palette.text.primary,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '&:before': { borderBottomColor: 'transparent' },
            '&:after': {
              borderBottomColor: alpha(theme.palette.background.default, 0.8),
            },
          },
          '.apexcharts-tooltip.apexcharts-theme-light': {
            ...cssStyles(theme).bgBlur(),
            border: 0,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '& .apexcharts-tooltip-title': {
              display: 'none',
            },
          },
          // Legend
          '.apexcharts-legend': {
            padding: 0,
            gap: '8px',
          },
          '.apexcharts-legend-series': {
            display: 'flex !important',
            alignItems: 'center',
          },
          '.apexcharts-legend-marker': {
            marginRight: 13,
          },
          '.apexcharts-legend-text': {
            textTransform: 'capitalize',
            fontFamily: `Plus Jakarta Sans !important`,
            marginTop: '3px',
          },
        },
      }}
    />
  );
}
