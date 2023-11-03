const pieChartData: any = {
  data: [44, 55],
};

const pieChartDataOptions = (theme: any) => ({
  colors: [theme?.palette?.success?.main, theme?.palette?.warning?.main],
});

export { pieChartData, pieChartDataOptions };
