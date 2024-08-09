export interface Avatar {
  id: string;
  url: string;
  size: number;
  mimetype: string;
}

export interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cognitoId: string;
  role: string;
  adminRoleId: string;
  liveStatus: string;
  status: string;
  products: string[];
  organization: string;
  numberOfEmployees: string;
  enableEmployeeVerification: boolean;
  createdBy: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
  departmentId: string | null;
  permissionsRole: string | null;
  createdAt: string;
  updatedAt: string;
  igStatus: string;
  avatar: Avatar;
  facebookUrl: string;
  jobTitle: string;
  language: string;
  linkedInUrl: string;
  twitterUrl: string;
  mobileNumber: string;
  timezone: string | null;
}

export interface Reminder {
  type: string;
  interval: number;
  timeUnit: string;
  _id: string;
}

export interface Recurring {
  days: string[];
  onDay: string[];
  onWeek: string[];
}

export interface Meeting {
  _id: string;
  title: string;
  agenda: string;
  category: string;
  isAllDay: boolean;
  timeZone: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: string;
  isRecurring: boolean;
  recurring: Recurring;
  reminders: Reminder[];
  status: string;
  companyId: string;
  peoples: string[];
  createdBy: string;
  joinUrl: string;
  meetingId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  bufferTime: Record<string, any>;
  userDetails: UserDetails;
}
export interface MeetingCard {
  id: number;
  meetingHeading: string;
  meetingType: string;
  meetingCount: number;
  color: string;
}

export interface Meta {
  page: number;
  pages: number;
  limit: number;
  total: number;
}
export interface ResponseData {
  allMeetings: number;
  upCommings: number;
  completed: number;
  meetings: Meeting[];
  meta: Meta;
}

export interface ApiResponseI {
  statusCode: number;
  message: string;
  data: ResponseData;
  error: string | null;
}
