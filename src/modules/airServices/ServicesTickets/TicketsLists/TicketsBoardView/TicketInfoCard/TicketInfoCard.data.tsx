export const ticketInfoCardAppearanceColor = (appearance: string) => {
  const New = 'New';
  const Overdue = 'Overdue';

  let color;

  switch (appearance) {
    case New:
      color = 'success';
      break;

    case Overdue:
      color = 'info';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
};

export const ticketInfoCardPriorityColor = (priority: string) => {
  const Low = 'Low';
  const Medium = 'Medium';

  let color;

  switch (priority) {
    case Low:
      color = 'success';
      break;

    case Medium:
      color = 'warning';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
};
