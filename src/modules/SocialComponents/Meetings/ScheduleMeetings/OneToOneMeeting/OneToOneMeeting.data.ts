export const oneToOneDefaultValues = {
  title: '',
  allDay: false,
  fromDate: new Date(),
  fromTime: new Date(),
  toDate: null,
  toTime: null,
  recurring: true,
  description: '',
  meetingType: '',
  location: '',
  bufferBefore: true,
  bufferAfter: true,
  bufferBeforeTime: '',
  bufferAfterTime: '',
  people: null,
  allowAttendee: false,
  weekDays: [],
  timeSlotDuration: { label: '30 Minutes', value: 30 },
  reminder: [{ type: '', counter: null, duration: '' }],
};
export const allDayValues = [
  {
    name: 'meetingType',
    value: 'In person meeting',
  },
  {
    name: 'location',
    value: '',
  },
  {
    name: 'fromTime',
    value: new Date(),
  },
  {
    name: 'toTime',
    value: null,
  },
  {
    name: 'recurring',
    value: false,
  },
  {
    name: 'bufferBefore',
    value: false,
  },
  {
    name: 'bufferBeforeTime',
    value: '',
  },
  {
    name: 'bufferAfter',
    value: false,
  },
  {
    name: 'bufferAfterTime',
    value: '',
  },
];
