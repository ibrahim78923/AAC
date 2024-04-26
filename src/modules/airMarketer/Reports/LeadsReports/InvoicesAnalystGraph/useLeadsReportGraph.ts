import { ApexOptions } from 'apexcharts';

const useLeadsReportGraph = () => {
  const series = [
    {
      name: 'Air Sales',
      data: [476, 354, 274, 678, 464, 775],
    },
    {
      name: 'Air Marketer',
      data: [692, 675, 557, 445, 344, 875],
    },
    {
      name: 'Air Services',
      data: [164, 145, 227, 667, 564, 275],
    },
    {
      name: 'Air Services',
      data: [264, 245, 117, 667, 164, 475],
    },
    {
      name: 'Air Services',
      data: [364, 345, 107, 667, 964, 175],
    },
    {
      name: 'Air Services',
      data: [464, 445, 397, 667, 111, 775],
    },
    {
      name: 'Air Services',
      data: [264, 545, 274, 667, 664, 275],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      // height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '18px',
        // endingShape: 'rounded',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      show: true,
      offsetX: 0,
      offsetY: 0,
      itemMargin: {
        horizontal: 15,
      },
    },
    responsive: [
      {
        breakpoint: 560,

        options: {
          legend: {
            position: 'bottom',
            offsetX: 10,
            offsetY: 4,
          },
          plotOptions: {
            bar: {
              columnWidth: '15px', // Set a smaller value for columnWidth in responsiveness
            },
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 8,
      colors: ['transparent'],
    },

    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },

    fill: {
      opacity: 1,
    },

    tooltip: {
      y: {
        formatter: function (val: any) {
          return '$ ' + val + ' thousands';
        },
      },
    },
  };
  return {
    series,
    options,
  };
};

export default useLeadsReportGraph;
