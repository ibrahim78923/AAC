export const chipColor = (chipLabel: string) => {
  const OPEN = 'OPEN';
  const PENDING = 'PENDING';
  const RESOLVED = 'RESOLVED ';
  const CLOSED = 'CLOSED ';

  let color;

  switch (chipLabel) {
    case OPEN:
      color = 'success';
      break;
    case RESOLVED:
      color = 'success';
      break;
    case PENDING:
      color = 'warning';

      break;
    case CLOSED:
      color = 'error';

      break;

    default:
      color = 'error';

      break;
  }
  return color;
};
