import { ApexOptions } from 'apexcharts';
export interface CustomChartPropsI {
  options: ApexOptions;
  series: ApexAxisChartSeries;
  type:
    | 'area'
    | 'line'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'
    | undefined;
  height?: string | number;
  width?: string | number;
}
