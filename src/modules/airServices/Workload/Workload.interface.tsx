export interface IData {
  day?: number;
  date?: string;
  totalPlannedEffort?: number;
  averagePlannedEffort?: number;
  count?: number;
}

export interface IDateHeaderContentData {
  date?: Date;
}

export interface IEventInfo {
  event?: {
    extendedProps?: {
      status?: string;
      taskNo?: string;
      data?: {
        title?: string;
        ticketId?: string;
      };
      img?: {
        src?: string;
      };
    };
    start?: Date;
    end?: Date;
  };
}

export interface IFilter {
  countDayWise?: boolean | undefined;
  countDayWiseHours?: boolean | undefined;
  countDayWiseHoursAverage?: boolean | undefined;
}

export interface IOnClickEvent {
  open?: any;
  data?: any;
}

export interface ISelected {
  _id?: string;
}
