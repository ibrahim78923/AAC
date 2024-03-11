import { CustomChart } from '@/components/Chart';
import { pieChartDataOptions } from './PieChart.data';
import { useTheme } from '@mui/material';
import { useGetDashboardAgentQuery } from '@/services/airServices/dashboard';

export const PieChart = () => {
  const theme = useTheme();
  const { data: agentData } = useGetDashboardAgentQuery(true);

  const pieCharts = [
    agentData?.data.availableAgents || 0,
    agentData?.data.unAvailableAgents || 0,
  ];

  return (
    <CustomChart
      options={{ ...pieChartDataOptions(theme), legend: { show: false } }}
      series={pieCharts}
      type="pie"
      height={212}
    />
  );
};
