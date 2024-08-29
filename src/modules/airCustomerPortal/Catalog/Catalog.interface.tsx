export interface CategoryI {
  categoryName: string;
  description: string;
  _id: string | undefined;
}

export interface ServiceI {
  attachmentDetails?: {
    fileUrl?: string;
  };
  itemName: string;
  description: string;
  cost: string | number;
  serviceCategory: string;
  _id: string;
}
