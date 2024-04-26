export const chipColor = (chipLabel: string) => {
  const Open = 'OPEN';
  const InProgress = 'warning';
  const pending = 'PENDING';
  const resolved = 'RESOLVED';

  let color;

  switch (chipLabel) {
    case Open:
      color = 'success';
      break;

    case InProgress:
      color = 'warning';
      break;
    case resolved:
      color = 'success';
      break;
    case pending:
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
