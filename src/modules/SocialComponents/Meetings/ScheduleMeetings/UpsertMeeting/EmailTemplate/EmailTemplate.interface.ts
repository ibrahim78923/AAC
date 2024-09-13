export interface MeetingDataI {
  _id: string;
  paragraph: string;
  createdBy: string;
  meetingId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

export interface RouterQuery {
  meetingId?: string;
  [key: string]: string | undefined;
}

export interface ApiResponseI {
  statusCode: number;
  message: string;
  data?: MeetingDataI[];
  error: string | null;
}
