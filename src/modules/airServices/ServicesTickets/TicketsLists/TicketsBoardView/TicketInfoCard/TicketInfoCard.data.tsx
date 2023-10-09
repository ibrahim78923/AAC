export const appearanceStyle = (appearance: string) => {
  let color;

  switch (appearance) {
    case 'New':
      color = 'success';
      break;

    case 'Overdue':
      color = 'info';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
};

export const priorityStyle = (priority: string) => {
  let color;

  switch (priority) {
    case 'Low':
      color = 'success';
      break;

    case 'Medium':
      color = 'warning';
      break;

    default:
      color = 'error';
      break;
  }
  return color;
};
