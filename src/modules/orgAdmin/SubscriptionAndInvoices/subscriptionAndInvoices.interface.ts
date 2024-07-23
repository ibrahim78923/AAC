export interface PlanCalculationsParamsI {
  additionalDefaultUser: number;
  additionalDefaultStorage: number;
  additionalUserPrice: number;
  additionalStoragePrice: number;
  planDefaultPrice: number;
  planDefaultDiscount: number;
  PLAN_CALCULATIONS: {
    PLAN_DISCOUNT: number;
  };
}

export interface PlanCalculationsResultI {
  perUserPrice: number;
  perStoragePrice: number;
  planPrice: number;
  additionalUsers: number;
  additionalStorage: number;
  planDiscount: number;
  planTax: number;
  convertedPlanDiscount: number;
  totalCostBeforeDiscount: number;
  discountedPriceBeforeTax: number;
  discountApplied: number;
  taxAmount: number;
  finalPrice: number;
}
