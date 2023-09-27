// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
// utils
// ----------------------------------------------------------------------
export const cssStyles = (theme: any) => {
  return {
    bgBlur: (props?: any) => {
      const color =
        props?.color || theme?.palette.background.default || '#000000';

      const blur = props?.blur || 6;
      const opacity = props?.opacity || 0.8;

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
        backgroundColor: alpha(color, opacity),
      };
    },
  };
};

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
            boxShadow: theme.customShadows.dropdown,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '&:before': { borderBottomColor: 'transparent' },
            '&:after': {
              borderBottomColor: alpha(theme.palette.background.default, 0.8),
            },
          },
          '.apexcharts-tooltip.apexcharts-theme-light': {
            ...cssStyles(theme).bgBlur(),
            border: 0,
            boxShadow: theme.customShadows.dropdown,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '& .apexcharts-tooltip-title': {
              border: 0,
              textAlign: 'center',
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: theme.palette.grey[500_16],
              color:
                theme.palette.text[
                  theme.palette.mode === 'light' ? 'secondary' : 'primary'
                ],
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
