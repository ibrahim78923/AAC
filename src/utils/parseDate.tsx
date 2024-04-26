export const parseDate = (dateString: any) => {
  const [month, day, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`).getTime();
};
