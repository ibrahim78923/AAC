export const ticketInfoBoardHeaderColor = (title: string) => {
  const Resolved = 'Resolved';
  const Pending = 'Pending';
  const Closed = 'Closed';

  let color;

  switch (title) {
    case Resolved:
      color = 'warning';
      break;

    case Pending:
      color = 'error';
      break;

    case Closed:
      color = 'success';
      break;

    default:
      color = 'info';
      break;
  }
  return color;
};
