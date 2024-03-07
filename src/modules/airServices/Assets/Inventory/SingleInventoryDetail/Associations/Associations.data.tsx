const STATUS_COLORS: { [key: string]: string } = {
  OPEN: 'success',
  CLOSED: 'error',
  RESOLVED: 'success',
  PENDING: 'warning',
  SPAM: 'default',
};
export const chipColor = (status: string): string => {
  return STATUS_COLORS[status] || 'default';
};
