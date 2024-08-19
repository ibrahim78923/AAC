export interface ServiceI {
  attachmentDetails?: {
    fileUrl?: string;
  };
  itemName: string;
  description: string;
  cost: string | number;
}

export interface ServiceCardPropsI {
  service: ServiceI;
  onCardClick: () => void;
}
