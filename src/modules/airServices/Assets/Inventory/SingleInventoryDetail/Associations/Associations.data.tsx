const STATUS_COLORS: { [key: string]: string } = {
  OPEN: 'success',
  CLOSED: 'error',
  RESOLVED: 'success',
  PENDING: 'warning',
  SPAMS: 'error',
};
export const chipColor = (status: string): string => {
  return STATUS_COLORS[status] || 'error';
};
