export const dateData = [
  {
    _id: 1,
    date: '5 Dec 2023',
    times: ['02:00 PM - 05:00 PM'],
  },
  {
    _id: 2,
    date: '5 Dec 2023',
    times: ['02:00 PM - 05:00 PM', '08:00 PM - 09:00 PM'],
  },
];
export const bufferTime = [
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 Minutes' },
  { value: 15, label: '15 Minutes' },
  { value: 20, label: '20 Minutes' },
];

export const overrideValues = {
  dateOverrides: [
    {
      date: new Date(),
      timeRanges: [{ startHour: new Date(), endHour: new Date() }],
    },
  ],
};
