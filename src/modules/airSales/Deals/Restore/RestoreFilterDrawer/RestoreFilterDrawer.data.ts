export const restoreDefaultValues = (data: any) => {
  return {
    startDate:
      typeof data?.dateStart === 'object' ? new Date(data?.dateStart) : null,
    endDate: typeof data?.dateEnd === 'object' ? new Date(data?.dateEnd) : null,
  };
};
