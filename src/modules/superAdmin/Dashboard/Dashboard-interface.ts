export interface statusCardsI {
  isLoading: boolean;
  data: Record<string, number>;
  totalClients: number;
  totalUsers: number;
  billingDataLoading: boolean;
  billingData: {
    earningThisMonth: {
      totalNetAmount: number;
    };
    earningLastMonth: {
      totalNetAmount: number;
    };
    earningThisYear: {
      totalNetAmount: number;
    };
    earningLastYear: {
      totalNetAmount: number;
    };
  };
}

export interface NotificationCardPropsI {
  plansList: string[];
}

export interface PlanListDataI {
  data: {
    plansList: string[];
  };
}

export interface CustomStepperIconProps {
  icon: React.ReactNode;
  borderColor: string;
}

export interface GraphCardPropsI {
  planStats: string[];
  planStatLoading: boolean;
  billingData: {
    invoicing: {
      inDividual: Array<{
        _id: string;
        totalNetAmount: number;
      }>;
      totalSum: number;
    };
    earningThisMonth: {
      _id: string;
      count: number;
      totalNetAmount: number;
    };
  };
  billingDataLoading: boolean;
  enquiriesData: string[];
  enquiriesDataLoading: boolean;
}

export interface EnquiriesCardPropsI {
  details: string[];
  isLoading: boolean;
}

export interface InvoicingCardPropsI {
  details: {
    invoicing: {
      inDividual: Array<{
        _id: string;
        totalNetAmount: number;
      }>;
    };
  };
  isLoading: boolean;
}

export interface StatisticsCardPropsI {
  isLoading: boolean;
  data: string[];
}

export interface ResultItemI {
  count: number;
  product: string;
  productType: string;
}
