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
  {
    id: 1,
    displayName: '#INC22',
    status: 'Open',
  },

  { id: 2, displayName: '#INC22', status: 'InProgress' },
];
