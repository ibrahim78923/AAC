import { pxToRem } from '@/utils/getFontValue';
import { useMediaQuery, useTheme } from '@mui/material';

export const useRespondents = ({ chartData }: any) => {
  const theme: any = useTheme();

  const totalRespondents: { [key: string]: number } = {
    TOTAL_RESPONDENTS: 10,
    MALE: 20,
    FEMALE: 30,
    OTHER: 50,
  };

  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'));

  const options: any = {
    labels: ['Total Respondents', 'Male', 'Female', 'Other'],
    colors: [
      theme?.palette?.success?.main,
      theme?.palette?.warning?.main,
      theme?.palette?.error?.main,
      theme?.palette?.slateBlue?.main,
    ],
    legend: {
      position: 'right',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 20,
          size: '50%',
        },

        dataLabels: {
          total: {
            show: !isMobile,
            label: `${chartData?.totalRespondents?.count ?? 130}`,
            color: theme?.palette?.slateBlue.main,
            formatter: () => '',
            fontSize: pxToRem(30),
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
  };

  const radialBarChartData = [
    totalRespondents?.TOTAL_RESPONDENTS,
    totalRespondents?.MALE,
    totalRespondents?.FEMALE,
    totalRespondents?.OTHER,
  ];

  return { options, radialBarChartData };
};
