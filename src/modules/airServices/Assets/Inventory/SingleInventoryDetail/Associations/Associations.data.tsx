export const chipColor = (chipLabel: string) => {
  const Open = 'Open';
  const InProgress = 'InProgress';

  let color;

  switch (chipLabel) {
    case Open:
      color = 'success';
      break;

    case InProgress:
      color = 'warning';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
};

export const associationsDataArray = [
  { ticketNo: '#INC-5-test', status: 'Open' },
  { ticketNo: '#INC-5-test', status: 'InProgress' },
];
