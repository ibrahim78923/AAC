export interface BuyerCompanyI {
  name: string;
  address: string;
  city: string;
  linkedInUrl: string;
}

export interface BuyerContactI {
  address: string;
  phoneNumber: string;
  email: string;
}

export interface PreparedByI {
  firstName: string;
  lastName: string;
}

export interface QuoteI {
  buyerCompany: BuyerCompanyI;
  buyerContact: BuyerContactI;
}

export interface DataI {
  quote: QuoteI;
  invoiceNo: string;
  createdAt: string;
  dueDate: string;
  preparedBy: PreparedByI;
}

export interface DetailCardPropsI {
  data: DataI;
}
