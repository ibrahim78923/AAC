export interface TableDataI {
  Id: number;
  ticketsid: string;
  taskname: string;
  duedate: string;
  assignedto: string;
  status: 'Open' | 'Pending' | 'Resolved';
}
