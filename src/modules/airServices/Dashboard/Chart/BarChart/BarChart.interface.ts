export interface ApexOptionsI {
  labels: string[];
  colors: string[];
}

export const BarChartDataOptions: any = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  colors: ['#FFC20E', '#FF4A4A', '#35A275', '#0AADC7'],
  plotOptions: {
    bar: {
      columnWidth: '50%',
    },
  },
};
