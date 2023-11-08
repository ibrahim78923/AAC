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

export const checkboxes = [
  { id: '1', label: 'Checkbox 1', status: 'InProgress' },
  { id: '2', label: 'Checkbox 2', status: 'Open' },
  { id: '3', label: 'Checkbox 3', status: 'Open' },
];
