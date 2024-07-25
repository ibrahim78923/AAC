interface PlanProductFeatureI {
  _id: string;
  productId: string;
  featureId: string[];
  dealsAssociationsDetail: string;
  __v: number;
}

// PlanTypeI Interface
interface PlanTypeI {
  _id: string;
  name: string;
  plan: any[];
  createdBy: string;
  isDeleted: boolean;
  createdAt: string;
  __v: number;
}

// LogoI Interface
interface LogoI {
  id: string;
  url: string;
  size: number;
  mimetype: string;
}

// ProductI Interface
interface ProductI {
  _id: string;
  name: string;
  description: string;
  logo: LogoI;
  status: string;
  createdBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  isChild: boolean;
}

export interface ChoosePlanI {
  _id: string;
  description: string;
  name: string;
  defaultUsers: number;
  defaultStorage: number;
  usedStorage: number;
  planPrice: number;
  additionalPerUserPrice: number;
  planProducts: string[];
  planProductFeatures: PlanProductFeatureI[];
  planProductPermissions: string[];
  additionalStoragePrice: number;
  createdBy: string;
  isDeleted: boolean;
  isActive: boolean;
  isCRM: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  planType: PlanTypeI;
  products: ProductI[];
}

export interface ErrorWithMessageI {
  data?: {
    message: string;
  };
}

export interface FeatureI {
  productName: string;
  [key: string]: any;
}

export interface GroupedDataI {
  [productName: string]: FeatureI[];
}

export interface PlanDataI {
  planTypeName: string;
  _id: string;
  description: string;
  name: string;
  defaultUsers: number;
  defaultStorage: number;
  usedStorage: number;
  planPrice: number;
  additionalPerUserPrice: number;
  planProducts: string[];
  planProductFeatures: {
    _id: string;
    productId: string;
    featureId: string[];
    dealsAssociationsDetail: string;
    __v: number;
  }[];
  planProductPermissions: string[];
  additionalStoragePrice: number;
  createdBy: string;
  isDeleted: boolean;
  isActive: boolean;
  isCRM: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  planType: {
    _id: string;
    name: string;
    plan: string[];
    createdBy: string;
    isDeleted: boolean;
    createdAt: string;
    __v: number;
  };
  products: {
    _id: string;
    name: string;
    description: string;
    logo: {
      id: string;
      url: string;
      size: number;
      mimetype: string;
    };
    status: string;
    createdBy: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
    isChild: boolean;
  }[];
}

export interface CreatedByI {
  _id: string;
  name: string;
  email: string;
}

export interface LogI {
  id: string;
  url: string;
  size: number;
  mimetype: string;
}

export interface ProductFeatureI {
  _id: string;
  productId: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdBy: CreatedByI;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
  productName: string;
  log: LogI;
}
