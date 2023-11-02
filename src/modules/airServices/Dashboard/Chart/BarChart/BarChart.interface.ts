export interface ApexOptionsI {
  labels: string[];
  colors: string[];
}

export const BarChartDataOptions: any = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  colors: ['#0AADC7', '#FF4A4A', '#FFC20E', '#35A275'],
  plotOptions: {
    bar: {
      columnWidth: '30%',
    },
  },
};
