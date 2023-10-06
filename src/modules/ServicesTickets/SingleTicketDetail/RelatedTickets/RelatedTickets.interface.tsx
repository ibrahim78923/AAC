export interface TableData {
  Id: number;
  ticketsid: string;
  taskname: string;
  duedate: string;
  assignedto: string;
  status: 'Open' | 'Pending' | 'Resolved';
}
