export interface MeetingData {
  _id: string;
  paragraph: string;
  createdBy: string;
  meetingId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RouterQuery {
  meetingId?: string;
  [key: string]: string | undefined;
}

export interface ApiResponseI {
  statusCode: number;
  message: string;
  data?: MeetingData[];
  error: string | null;
}
