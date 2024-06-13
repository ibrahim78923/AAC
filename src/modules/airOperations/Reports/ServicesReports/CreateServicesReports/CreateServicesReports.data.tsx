export const fieldsList = [
  {
    id: '0',
    title: 'Chart',
    match: 'chart',
    description: 'Visualize your data',
  },
  {
    id: '1',
    title: 'Interactive filter',
    match: 'interactiveFilter',
    description: 'Slice and dice your data on the fly',
  },
  {
    id: '2',
    title: 'Text',
    match: 'text',
    description: 'Add context to your report',
  },
  {
    id: '3',
    title: 'Table',
    match: 'table',
    description: 'General Table',
  },
];

export const modalInitialState: any = {
  chart: false,
  interactiveFilter: false,
  text: false,
  table: false,
};
